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

const confirmSignup = (email: string, code: string) => {
  const newUser = new CognitoUser({
    Username: email,
    Pool: cognitoUserPool
  });
  const promisifiedConfirmSignup = promisify(newUser.confirmRegistration).bind(newUser);
  promisifiedConfirmSignup(code, false);
};

const resendConfirmCode = (email: string) => {
  const newUser = new CognitoUser({
    Username: email,
    Pool: cognitoUserPool
  });
  const promisifiedConfirmSignup = promisify(newUser.resendConfirmationCode).bind(newUser);
  promisifiedConfirmSignup();
};

const signIn = (email: string, password: string): Promise<void> => {
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
      onSuccess() {
        return resolve();
      },
      onFailure(err?: Error | undefined) {
        return reject(err?.message);
      }
    });
  });
};

const signOut = () => {
  const user = cognitoUserPool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};
interface ISessionResponse {
  email?: string;
  idToken: string;
  accessToken: string;
}
const getSession = (): Promise<ISessionResponse> => {
  return new Promise((resolve, reject) => {
    const user = cognitoUserPool.getCurrentUser();
    if (user) {
      user.getSession((err: Error | null, session: CognitoUserSession) => {
        if (err) {
          return reject(err.message);
        } else {
          if (!session || !session.isValid()) {
            return reject('Session is not valid');
          }
          user.getUserAttributes((err, att) => {
            if (err) {
              return reject(err.message);
            }
            return resolve({
              email: att?.find((a) => a.getName() === 'email')?.getValue(),
              idToken: session.getIdToken().getJwtToken(),
              accessToken: session.getAccessToken().getJwtToken()
            });
          });
        }
      });
    } else {
      return reject('There is no user');
    }
  });
};
const forgotPassword = (email: string): Promise<void> => {
  const newUser = new CognitoUser({
    Username: email,
    Pool: cognitoUserPool
  });
  return new Promise((resolve, reject) => {
    newUser.forgotPassword({
      onSuccess: () => {
        return resolve();
      },
      onFailure: (err) => {
        return reject(err);
      }
    });
  });
};
const confirmPassword = (email: string, otp: string, newPassword: string): Promise<void> => {
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: cognitoUserPool
  });
  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(otp, newPassword, {
      onFailure(err) {
        return reject(err);
      },
      onSuccess() {
        return resolve();
      }
    });
  });
};

export {
  signUp,
  confirmSignup,
  resendConfirmCode,
  signIn,
  signOut,
  getSession,
  forgotPassword,
  confirmPassword
};
