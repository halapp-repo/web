import { SignupCode } from '../../models/signup-code';
import { UserVMWithPreview } from '../../models/viewmodels/user-with-preview';

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
  profile?: UserVMWithPreview;
};

export interface AuthState {
  userAuth: UserAuth;
  signupCode?: SignupCode | null;
}

export type { UserAuthStatus };
