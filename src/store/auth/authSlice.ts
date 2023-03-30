import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { AuthError, AuthState, UserAuth } from './authState';
import {
  signUp as signUpFunc,
  confirmRegistration as confirmRegistrationFunc,
  resendConfirmCode as resendConfirmCodeFunc,
  signIn as signInFunc,
  signOut as signOutFunc,
  getSession as getSessionFunc,
  forgotPassword as forgotPasswordFunc,
  confirmPassword as confirmPasswordFunc,
  AuthApi,
  getUserAttributes as getUserAttributesFunc,
  checkTokenExpiration
} from './authApi';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { AuthResponseDTO } from '../../models/dtos/auth-response.dto';
import { SignupCode } from '../../models/signup-code';
import { fetchById, updateUser, uploadAvatar } from '../users/usersSlice';
import { UserSessionStorage } from '../../models/viewmodels/user-session.storage';
import { UserToUserDTOMapper } from '../../mappers/user-to-user-dto.mapper';
import { USERSESSION } from '../../models/constants/user-session';

const defaultUserAuth: UserAuth = {
  id: '',
  authenticated: false,
  confirmed: false,
  email: '',
  needConfirmation: false,
  error: null,
  idToken: undefined,
  accessToken: undefined,
  status: undefined,
  isAdmin: false,
  profile: undefined
};

export const signUp = createAsyncThunk<
  AuthResponseDTO | null,
  { email: string; password: string; code: string; organizationId: string }
>('auth/signup', async ({ email, password, code, organizationId }) => {
  const res: ISignUpResult | undefined = await signUpFunc(email, password, code, organizationId);
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

export const signIn = createAsyncThunk<
  AuthResponseDTO | null,
  { email: string; password: string; code?: SignupCode | null }
>('auth/signin', async ({ email, password, code }) => {
  try {
    const response = await signInFunc(email, password, code && code.isActive() ? code.Code : null);
    const userAttr = await getUserAttributesFunc(response.user);

    localStorage.setItem(
      USERSESSION,
      JSON.stringify({ email: userAttr.Email, id: userAttr.ID, isAdmin: userAttr.IsAdmin })
    );
    return <AuthResponseDTO>{
      Confirmed: true,
      Authenticated: true,
      Email: email,
      AccessToken: response.accessToken,
      IdToken: response.idToken,
      IsAdmin: userAttr.IsAdmin,
      UserId: userAttr.ID
    };
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'User is not confirmed.') {
        resendConfirmCodeFunc(email);
      }
    }
    throw err;
  }
});

export const signOut = createAsyncThunk('auth/signout', async () => {
  await signOutFunc();
});

export const getSession = createAsyncThunk<AuthResponseDTO>(
  'auth/getCognitoUserSession',
  async () => {
    const session = await getSessionFunc();
    return {
      IdToken: session.idToken,
      AccessToken: session.accessToken
    };
  }
);

export const refreshSession = createAsyncThunk<AuthResponseDTO>('auth/refreshSession', async () => {
  const session = await checkTokenExpiration();
  return {
    IdToken: session.idToken,
    AccessToken: session.accessToken
  };
});

export const getCognitoUser = createAsyncThunk<AuthResponseDTO | null>(
  'auth/getCognitoUser',
  async () => {
    const rawCognitoUser = localStorage.getItem(USERSESSION);
    if (rawCognitoUser) {
      const { email, id, isAdmin, profile } = JSON.parse(rawCognitoUser) as UserSessionStorage;
      return {
        Email: email,
        UserId: id,
        IsAdmin: isAdmin,
        Profile: profile
      } as AuthResponseDTO;
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

export const getSignupCodeDetails = createAsyncThunk<SignupCode, { code: string }>(
  'auth/getSignupCode',
  async ({ code }) => {
    const api = new AuthApi();
    const response = await api.getSignupCode(code);
    return response;
  }
);

const initialState = {
  userAuth: defaultUserAuth,
  signupCode: undefined
} as AuthState;

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearStatusAndError: (state: AuthState) => {
      state.userAuth = {
        ...state.userAuth,
        status: undefined,
        error: null
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      const data = action.payload;
      const { email } = action.meta.arg;
      if (data) {
        state.userAuth = {
          ...state.userAuth,
          confirmed: data.Confirmed!,
          email: email.toUpperCase(),
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
          error: new AuthError(`${action.meta.arg.email} kullanimda.`, error.code)
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(confirmRegistration.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.userAuth = {
          ...state.userAuth,
          confirmed: true,
          needConfirmation: false,
          error: null,
          ...(data.Email ? { email: data.Email } : null)
        };
      }
    });
    builder.addCase(confirmRegistration.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'ExpiredCodeException') {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Girdiginiz kodun süresi dolmuş, lutfen tekrar kod yaratin.')
        };
      } else if (error.code === 'NotAuthorizedException') {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Bu islem icin yetkili degilsiniz.')
        };
      } else if (error.code === 'CodeMismatchException') {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Doğrulama kodu hatalı.')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(resendConfirmCode.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'CodeDeliveryDetails') {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Girdiginiz Email bulunmamaktadir.')
        };
      } else if (error.code === 'LimitExceededException') {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Deneme limitinizi doldurdunuz, biraz sonra deneyiniz.')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      const data = action.payload;
      const { email } = action.meta.arg;
      if (data) {
        state.userAuth = {
          ...state.userAuth,
          confirmed: data.Confirmed!,
          authenticated: data.Authenticated!,
          needConfirmation: false,
          error: null,
          idToken: data.IdToken,
          accessToken: data.AccessToken,
          email: email.toUpperCase(),
          ...(data.UserId
            ? {
                id: data.UserId
              }
            : null),
          ...(data.IsAdmin
            ? {
                isAdmin: data.IsAdmin
              }
            : null)
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
          email: email.toUpperCase(),
          needConfirmation: true,
          error: new AuthError('Email adresinizi onaylamaniz gerekmektedir'),
          idToken: undefined,
          accessToken: undefined
        };
      } else if (action.error.code === 'NotAuthorizedException') {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Email adresiniz ve/veya şifreniz hatalı.')
        };
      } else if (action.error.code === 'UserNotFoundException') {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Email adresiniz ve/veya şifreniz hatalı.')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          error: new AuthError('Bilinmeyen hata olustu.')
        };
      }
    });
    builder.addCase(signOut.fulfilled, (state) => {
      localStorage.removeItem(USERSESSION);
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
    // refresh session
    builder.addCase(refreshSession.fulfilled, (state, action) => {
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
    // confirm password
    builder.addCase(confirmPassword.fulfilled, (state) => {
      state.userAuth = {
        ...state.userAuth,
        status: 'confirmPasswordFulfilled',
        error: new AuthError('Doğrulama kodu hatalı.')
      };
    });
    builder.addCase(confirmPassword.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'CodeMismatchException') {
        state.userAuth = {
          ...state.userAuth,
          status: 'confirmPasswordRejected',
          error: new AuthError('Doğrulama kodu hatalı.')
        };
      } else if (error.code === 'ExpiredCodeException') {
        state.userAuth = {
          ...state.userAuth,
          status: 'confirmPasswordRejected',
          error: new AuthError('Girdiginiz kodun süresi dolmuş, lutfen tekrar kod yaratin.')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          status: 'confirmPasswordRejected',
          error: new AuthError('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.userAuth = {
        ...state.userAuth,
        status: 'ForgotPasswordFulfilled',
        error: null
      };
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      const error = action.error;
      if (error.code === 'CodeDeliveryDetails') {
        state.userAuth = {
          ...state.userAuth,
          status: 'ForgotPasswordRejected',
          error: new AuthError('Bu islem icin yetkili degilsiniz.')
        };
      } else if (error.code === 'InvalidParameterException') {
        state.userAuth = {
          ...state.userAuth,
          status: 'ForgotPasswordRejected',
          error: new AuthError('Kullanici kayitli degil')
        };
      } else {
        state.userAuth = {
          ...state.userAuth,
          status: 'ForgotPasswordRejected',
          error: new AuthError('Bilinmeyen bir hata olustu.')
        };
      }
    });
    builder.addCase(getCognitoUser.fulfilled, (state, action) => {
      if (action.payload) {
        const { Email, UserId, IsAdmin } = action.payload;
        state.userAuth = {
          ...state.userAuth,
          ...(Email
            ? {
                email: Email.toUpperCase()
              }
            : null),
          ...(UserId
            ? {
                id: UserId
              }
            : null),
          ...(IsAdmin ? { isAdmin: true } : null)
        };
      }
    });
    builder.addCase(getSignupCodeDetails.fulfilled, (state, action) => {
      state.signupCode = action.payload;
    });
    builder.addCase(getSignupCodeDetails.rejected, (state) => {
      state.signupCode = null;
    });
    // fetch user
    builder.addCase(fetchById.fulfilled, (state, action) => {
      const { id } = state.userAuth;
      const payload = action.payload;
      if (id === payload.ID) {
        const rawCognitoUser = localStorage.getItem(USERSESSION);
        if (rawCognitoUser) {
          const { email, id, isAdmin, cart } = JSON.parse(rawCognitoUser) as UserSessionStorage;
          localStorage.setItem(
            USERSESSION,
            JSON.stringify({
              email,
              id,
              cart,
              isAdmin,
              profile: payload
            } as UserSessionStorage)
          );
          state = {
            ...state,
            userAuth: {
              ...state.userAuth,
              profile: payload
            }
          };
          return state;
        }
      }
      return state;
    });
    // update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { id } = state.userAuth;
      const payload = action.payload;
      if (id === payload.ID) {
        const rawCognitoUser = localStorage.getItem(USERSESSION);
        if (rawCognitoUser) {
          const { email, id, isAdmin, cart } = JSON.parse(rawCognitoUser) as UserSessionStorage;
          localStorage.setItem(
            USERSESSION,
            JSON.stringify({
              email,
              id,
              isAdmin,
              cart,
              profile: payload
            } as UserSessionStorage)
          );
          state = {
            ...state,
            userAuth: {
              ...state.userAuth,
              profile: payload
            }
          };
          return state;
        }
      }
      return state;
    });
    // update avatar
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      const { id } = state.userAuth;
      const { preview, ID } = action.meta.arg;

      if (id === ID) {
        const rawCognitoUser = localStorage.getItem(USERSESSION);
        if (rawCognitoUser) {
          const { email, id, isAdmin, profile, cart } = JSON.parse(
            rawCognitoUser
          ) as UserSessionStorage;
          localStorage.setItem(
            USERSESSION,
            JSON.stringify({
              email,
              id,
              isAdmin,
              cart,
              profile: {
                ...profile,
                Preview: preview
              }
            } as UserSessionStorage)
          );
          const stateProfile = state.userAuth.profile;
          state = {
            ...state,
            userAuth: {
              ...state.userAuth,
              ...(stateProfile
                ? {
                    profile: {
                      ...stateProfile,
                      Preview: preview
                    }
                  }
                : null)
            }
          };
          return state;
        }
      }
      return state;
    });
  }
});
export const { clearStatusAndError } = AuthSlice.actions;

export const selectUserAuth = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.userAuth
);
export const SelectSignupCode = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.signupCode
);
export const selectUserProfile = createSelector([(state: RootState) => state.auth], (state) => {
  const profile = state.userAuth.profile;
  const mapper = new UserToUserDTOMapper();
  if (profile) {
    return mapper.toModel(profile);
  }
  return undefined;
});

export default AuthSlice.reducer;
