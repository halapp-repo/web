import { SignupCode } from '../../models/signup-code';

export class AuthError extends Error {
  ErrorCode?: string;
  constructor(message: string, errorCode?: string) {
    super(message);
    this.ErrorCode = errorCode;
  }
}

type UserAuthStatus =
  | 'ForgotPasswordRejected'
  | 'ForgotPasswordFulfilled'
  | 'confirmPasswordFulfilled'
  | 'confirmPasswordRejected';

export type UserAuth = {
  id: string;
  authenticated: boolean;
  confirmed: boolean;
  email: string;
  needConfirmation: boolean;
  error?: AuthError | null | undefined;
  idToken?: string | undefined;
  accessToken?: string | undefined;
  status?: UserAuthStatus;
  isAdmin: boolean;
};

export interface AuthState {
  userAuth: UserAuth;
  signupCode?: SignupCode | null;
}

export type { UserAuthStatus };
