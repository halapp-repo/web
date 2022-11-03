import { CognitoUser } from 'amazon-cognito-identity-js';

export type UserAuth = {
  userId: string | number;
  idToken: string;
  ts?: string | number;
  authenticated: boolean;
  confirmed: boolean;
  email: string;
  user: CognitoUser | null;
};

export interface AuthState {
  userAuth: UserAuth;
}
