import { CognitoUser } from 'amazon-cognito-identity-js';

export interface SignupResponseDTO {
  UserSub: string;
  UserConfirmed: boolean;
  User: CognitoUser;
}
