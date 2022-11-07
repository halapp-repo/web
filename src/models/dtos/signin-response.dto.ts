import { CognitoUserSession } from 'amazon-cognito-identity-js';

export interface SigninResponseDTO {
  Session: CognitoUserSession;
  UserConfirmed: boolean;
  UserAuthenticated: boolean;
}
