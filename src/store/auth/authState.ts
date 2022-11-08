import { CognitoUser } from 'amazon-cognito-identity-js';

export type UserAuth = {
  authenticated: boolean;
  confirmed: boolean;
  email: string;
  needConfirmation: boolean;
  error?: Error | null | undefined;
  idToken?: string | undefined;
  accessToken?: string | undefined;
};

export interface AuthState {
  userAuth: UserAuth;
  cognitoUser?: CognitoUser | null;
}
