import { SignupCode } from '../../models/signup-code';

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
  error?: Error | null | undefined;
  idToken?: string | undefined;
  accessToken?: string | undefined;
  status?: UserAuthStatus;
};

export interface AuthState {
  userAuth: UserAuth;
  signupCode?: SignupCode | null;
}

export type { UserAuthStatus };
