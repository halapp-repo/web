import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { AuthState, UserAuth } from './authState';
import {
  signUp as signUpFunc,
  confirmSignup as confirmSignupFunc,
  resendConfirmCode as resendConfirmCodeFunc,
  signIn as signInFunc
} from './authApi';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { SignupResponseDTO } from '../../models/dtos/signup-response.dto';
import { SignupConfirmResponseDTO } from '../../models/dtos/signup-confirm-response.dto';

const defaultUserAuth: UserAuth = {
  userId: '',
  authenticated: false,
  confirmed: false,
  email: ''
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
  if (userAuth.userId) {
    await confirmSignupFunc(userAuth.userId, code);
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
    if (userAuth.userId) {
      await resendConfirmCodeFunc(userAuth.userId);
    }
  }
);

export const signIn = createAsyncThunk<void, { email: string; password: string }>(
  'auth/signin',
  async ({ email, password }) => {
    const res = await signInFunc(email, password);
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
          confirmed: data.UserConfirmed,
          userId: data.UserSub,
          email: email
        };
      }
    });
    builder.addCase(confirmSignUp.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.userAuth = {
          ...state.userAuth,
          confirmed: data.UserConfirmed
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
