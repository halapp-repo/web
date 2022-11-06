import { promisify } from 'util';
import {
  CognitoUser,
  CognitoUserAttribute,
  ClientMetadata,
  ISignUpResult,
  AuthenticationDetails,
  IAuthenticationDetailsData,
  ICognitoUserData,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import cognitoUserPool from '../../aws/CognitoUserPool';
import { UserAuth } from './authState';

const signUp = (
  email: string,
  password: string,
  code: string
): Promise<ISignUpResult | undefined> => {
  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email
  });
  const metaData: ClientMetadata = {
    signupCode: code
  };
  const attributes = [emailAttribute];

  return new Promise((resolve, reject) => {
    cognitoUserPool.signUp(
      email,
      password,
      attributes,
      [],
      (err?: Error | undefined, result?: ISignUpResult | undefined) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      },
      metaData
    );
  });
};

const confirmSignup = (userId: string, code: string) => {
  const newUser = new CognitoUser({
    Username: userId,
    Pool: cognitoUserPool
  });
  const promisifiedConfirmSignup = promisify(newUser.confirmRegistration).bind(newUser);
  promisifiedConfirmSignup(code, false);
};

const resendConfirmCode = (userId: string) => {
  const newUser = new CognitoUser({
    Username: userId,
    Pool: cognitoUserPool
  });
  const promisifiedConfirmSignup = promisify(newUser.resendConfirmationCode).bind(newUser);
  promisifiedConfirmSignup();
};

interface ISignInResult {
  confirmed: boolean | undefined;
  authenticated: boolean | undefined;
  session: CognitoUserSession;
}
const signIn = (email: string, password: string): Promise<ISignInResult> => {
  const authenticationData: IAuthenticationDetailsData = {
    Username: email,
    Password: password
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData: ICognitoUserData = {
    Username: email,
    Pool: cognitoUserPool
  };
  const cognitoUser = new CognitoUser(userData);
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(session, userConfirmationNecessary?) {
        console.log(userConfirmationNecessary);
        console.log(JSON.stringify(session));
        return resolve({
          confirmed: userConfirmationNecessary,
          authenticated: true,
          session
        });
      },
      onFailure(err?: Error | undefined) {
        return reject(err?.message);
      }
    });
  });
};

export { signUp, confirmSignup, resendConfirmCode, signIn };
