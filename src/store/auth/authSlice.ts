import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { AuthState, UserAuth } from './authState';
import {
  signUp as signUpFunc,
  confirmSignup as confirmSignupFunc,
  resendConfirmCode as resendConfirmCodeFunc,
  signIn as signInFunc,
  ISignInResult
} from './authApi';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { SignupResponseDTO } from '../../models/dtos/signup-response.dto';
import { SignupConfirmResponseDTO } from '../../models/dtos/signup-confirm-response.dto';
import { SigninResponseDTO } from '../../models/dtos/signin-response.dto';

const defaultUserAuth: UserAuth = {
  userId: '',
  authenticated: false,
  confirmed: false,
  email: '',
  needConfirmation: false
};

export const signUp = createAsyncThunk<
  SignupResponseDTO | null,
  { email: string; password: string; code: string }
>('auth/signup', async ({ email, password, code }) => {
  const res: ISignUpResult | undefined = await signUpFunc(email, password, code);
  if (res) {
    return {
      UserSub: res.userSub,
      UserConfirmed: res.userConfirmed,
      User: res.user
    };
  }
  return null;
});

export const confirmSignUp = createAsyncThunk<
  SignupConfirmResponseDTO | null,
  { code: string },
  { state: RootState }
>('auth/signupConfirm', async ({ code }, { getState }) => {
  const { userAuth } = getState().auth;
  if (userAuth.email) {
    await confirmSignupFunc(userAuth.email, code);
    return {
      UserConfirmed: true
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
  SigninResponseDTO | null,
  { email: string; password: string }
>('auth/signin', async ({ email, password }) => {
  const res: ISignInResult = await signInFunc(email, password);
  if (res) {
    return <SigninResponseDTO>{
      UserConfirmed: res.confirmed,
      UserAuthenticated: res.authenticated,
      Session: res.session
    };
  }
  return null;
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
          confirmed: data.UserConfirmed,
          userId: data.UserSub,
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
          confirmed: data.UserConfirmed,
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
          confirmed: data.UserConfirmed,
          authenticated: data.UserAuthenticated,
          needConfirmation: false,
          error: null
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
  }
});

export const selectUserAuth = createSelector(
  [(state: RootState) => state.auth],
  (state) => state.userAuth
);

export default AuthSlice.reducer;
