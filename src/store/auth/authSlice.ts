import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { AuthState, UserAuth } from './authState';
import {
  signUp as signUpFunc,
  confirmSignup as confirmSignupFunc,
  resendConfirmCode as resendConfirmCodeFunc,
  signIn as signInFunc,
  signOut as signOutFunc,
  getSession as getSessionFunc,
  forgotPassword as forgotPasswordFunc
} from './authApi';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { AuthResponseDTO } from '../../models/dtos/auth-response.dto';

const defaultUserAuth: UserAuth = {
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

export const confirmSignUp = createAsyncThunk<
  AuthResponseDTO | null,
  { code: string },
  { state: RootState }
>('auth/signupConfirm', async ({ code }, { getState }) => {
  const { userAuth } = getState().auth;
  if (userAuth.email) {
    await confirmSignupFunc(userAuth.email, code);
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
    await signInFunc(email, password);
    return <AuthResponseDTO>{
      Confirmed: true,
      Authenticated: true,
      Email: email
    };
  }
);

export const signOut = createAsyncThunk('auth/signout', async () => {
  await signOutFunc();
});

export const getSession = createAsyncThunk<AuthResponseDTO>(
  'auth/getCognitoUserSession',
  async () => {
    const session = await getSessionFunc();
    return {
      Email: session.email,
      IdToken: session.idToken,
      AccessToken: session.accessToken
    };
  }
);

export const forgotPassword = createAsyncThunk<void, { email: string }>(
  'auth/forgotPassword',
  async ({ email }) => {
    await forgotPasswordFunc(email);
  }
);

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
    builder.addCase(confirmSignUp.fulfilled, (state, action) => {
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
    builder.addCase(signIn.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.userAuth = {
          ...state.userAuth,
          confirmed: data.Confirmed!,
          authenticated: data.Authenticated!,
          needConfirmation: false,
          error: null,
          email: data.Email!
        };
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      const { email } = action.meta.arg;
      if (action.error.message === 'User is not confirmed.') {
        state.userAuth = {
          ...state.userAuth,
          confirmed: false,
          authenticated: false,
          email,
          needConfirmation: true,
          error: null
        };
      } else if (action.error.message === 'User does not exist.') {
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
      const { Email, IdToken, AccessToken } = action.payload;
      state.userAuth = {
        ...state.userAuth,
        confirmed: true,
        authenticated: true,
        needConfirmation: false,
        error: null,
        email: Email!,
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
  }
});

export const selectUserAuth = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.userAuth
);

export default AuthSlice.reducer;
