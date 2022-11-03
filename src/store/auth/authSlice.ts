import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { AuthState, UserAuth } from './authState';
import { signUp as signUpFunc, confirmSignup as confirmSignupFunc } from './authApi';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js';
import { SignupResponseDTO } from '../../models/dtos/signup-response.dto';
import cognitoUserPool from '../../aws/CognitoUserPool';
import { SignupConfirmResponseDTO } from '../../models/dtos/signup-confirm-response.dto';

const defaultUserAuth: UserAuth = {
  userId: 0,
  authenticated: false,
  idToken: '',
  confirmed: false,
  email: '',
  user: null
};

export const signUp = createAsyncThunk<
  SignupResponseDTO | null,
  { email: string; password: string }
>('auth/signup', async ({ email, password }) => {
  const res: ISignUpResult | undefined = await signUpFunc(email, password);
  if (res) {
    return {
      UserSub: res.userSub,
      UserConfirmed: res.userConfirmed
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
  if (userAuth.user) {
    await confirmSignupFunc(userAuth.user, code);
    return {
      UserConfirmed: true
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
          user: new CognitoUser({
            Pool: cognitoUserPool,
            Username: data.UserSub
          })
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
