import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { AuthState, UserAuth } from './authState';
import {
  signUp as signUpFunc,
  confirmRegistration as confirmRegistrationFunc,
  resendConfirmCode as resendConfirmCodeFunc,
  signIn as signInFunc,
  signOut as signOutFunc,
  getSession as getSessionFunc,
  forgotPassword as forgotPasswordFunc,
  confirmPassword as confirmPasswordFunc
} from './authApi';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { AuthResponseDTO } from '../../models/dtos/auth-response.dto';

const CognitoUserLS = 'cognitouser';

const defaultUserAuth: UserAuth = {
  id: '',
  authenticated: false,
  confirmed: false,
  email: '',
  needConfirmation: false,
  error: null,
  idToken: undefined,
  accessToken: undefined
};

export const signUp = createAsyncThunk<
  AuthResponseDTO | null,
  { email: string; password: string; code: string }
>('auth/signup', async ({ email, password, code }) => {
  const res: ISignUpResult | undefined = await signUpFunc(email, password, code);
  if (res) {
    return {
      UserId: res.userSub,
      Confirmed: res.userConfirmed,
      Email: email
    };
  }
  return null;
});

export const confirmRegistration = createAsyncThunk<
  AuthResponseDTO | null,
  { code: string },
  { state: RootState }
>('auth/confirmRegistration', async ({ code }, { getState }) => {
  const { userAuth } = getState().auth;
  if (userAuth.email) {
    await confirmRegistrationFunc(userAuth.email, code);
    return {
      Confirmed: true
    };
  }
  return null;
});

export const resendConfirmCode = createAsyncThunk<void, void, { state: RootState }>(
  'auth/resendConfirm',
  async (_, { getState }) => {
    const { userAuth } = getState().auth;
    if (userAuth.email) {
      await resendConfirmCodeFunc(userAuth.email);
    }
  }
);

export const signIn = createAsyncThunk<AuthResponseDTO | null, { email: string; password: string }>(
  'auth/signin',
  async ({ email, password }) => {
    try {
      const response = await signInFunc(email, password);
      localStorage.setItem(CognitoUserLS, JSON.stringify({ email }));
      return <AuthResponseDTO>{
        Confirmed: true,
        Authenticated: true,
        Email: email,
        AccessToken: response.accessToken,
        IdToken: response.idToken
      };
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'User is not confirmed.') {
          resendConfirmCodeFunc(email);
        }
      }
      throw err;
    }
  }
);

export const signOut = createAsyncThunk('auth/signout', async () => {
  await signOutFunc();
  localStorage.removeItem(CognitoUserLS);
});

export const getSession = createAsyncThunk<AuthResponseDTO>(
  'auth/getCognitoUserSession',
  async () => {
    try {
      const session = await getSessionFunc();
      return {
        IdToken: session.idToken,
        AccessToken: session.accessToken
      };
    } catch (err) {
      localStorage.removeItem(CognitoUserLS);
      throw err;
    }
  }
);

export const getCognitoUser = createAsyncThunk<AuthResponseDTO | null>(
  'auth/getCognitoUser',
  async () => {
    const rawCognitoUser = localStorage.getItem(CognitoUserLS);
    if (rawCognitoUser) {
      const { email } = JSON.parse(rawCognitoUser);
      return {
        Email: email
      };
    }
    return null;
  }
);

export const forgotPassword = createAsyncThunk<void, { email: string }>(
  'auth/forgotPassword',
  async ({ email }) => {
    await forgotPasswordFunc(email);
  }
);

export const confirmPassword = createAsyncThunk<
  void,
  { email: string; otp: string; password: string }
>('auth/confirmPassword', async ({ email, otp, password }) => {
  await confirmPasswordFunc(email, otp, password);
});

const initialState = {
  userAuth: defaultUserAuth
} as AuthState;

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      const data = action.payload;
      const { email } = action.meta.arg;
      if (data) {
        state.userAuth = {
          ...state.userAuth,
          confirmed: data.Confirmed!,
          email: email,
          needConfirmation: true,
          error: null
        };
      }
    });
    builder.addCase(signUp.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'UsernameExistsException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Bu Email adresi kullanılamaz. Lütfen başka bir Email adresi deneyiniz.')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(confirmRegistration.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.userAuth = {
          ...state.userAuth,
          confirmed: data.Confirmed!,
          needConfirmation: false,
          error: null
        };
      }
    });
    builder.addCase(confirmRegistration.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'ExpiredCodeException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Girdiginiz kodun süresi dolmuş, lutfen tekrar kod yaratin.')
        };
      } else if (error.code === 'NotAuthorizedException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Bu islem icin yetkili degilsiniz.')
        };
      } else if (error.code === 'CodeMismatchException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Doğrulama kodu hatalı.')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(resendConfirmCode.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'CodeDeliveryDetails') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Girdiginiz Email bulunmamaktadir.')
        };
      } else if (error.code === 'LimitExceededException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Deneme limitinizi doldurdunuz, biraz sonra deneyiniz.')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.userAuth = {
          ...state.userAuth,
          confirmed: data.Confirmed!,
          authenticated: data.Authenticated!,
          needConfirmation: false,
          error: null,
          email: data.Email!,
          idToken: data.IdToken,
          accessToken: data.AccessToken
        };
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      const { email } = action.meta.arg;
      if (action.error.code === 'UserNotConfirmedException') {
        state.userAuth = {
          ...state.userAuth,
          confirmed: false,
          authenticated: false,
          email,
          needConfirmation: true,
          error: new Error('Email adresinizi onaylamaniz gerekmektedir'),
          idToken: undefined,
          accessToken: undefined
        };
      } else if (action.error.code === 'UserNotFoundException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Email adresiniz ve/veya şifreniz hatalı.')
        };
      }
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.userAuth = {
        ...state.userAuth,
        ...defaultUserAuth
      };
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      const { IdToken, AccessToken } = action.payload;
      state.userAuth = {
        ...state.userAuth,
        confirmed: true,
        authenticated: true,
        needConfirmation: false,
        error: null,
        idToken: IdToken,
        accessToken: AccessToken
      };
    });
    builder.addCase(getSession.rejected, (state) => {
      state.userAuth = {
        ...state.userAuth,
        ...defaultUserAuth
      };
    });
    builder.addCase(confirmPassword.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'CodeMismatchException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Doğrulama kodu hatalı.')
        };
      } else if (error.code === 'ExpiredCodeException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Girdiginiz kodun süresi dolmuş, lutfen tekrar kod yaratin.')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'CodeDeliveryDetails') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Bu islem icin yetkili degilsiniz.')
        };
      } else if (error.code === 'InvalidParameterException') {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Kullanici kayitli degil')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new Error('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(getCognitoUser.fulfilled, (state, action) => {
      if (action.payload) {
        const { Email } = action.payload;
        state.userAuth = {
          ...state.userAuth,
          ...(Email
            ? {
                email: Email
              }
            : null)
        };
      }
    });
  }
});

export const selectUserAuth = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.userAuth
);

export default AuthSlice.reducer;
