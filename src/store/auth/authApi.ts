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

const confirmRegistration = (email: string, code: string) => {
  const newUser = new CognitoUser({
    Username: email,
    Pool: cognitoUserPool
  });
  return new Promise((resolve, reject) => {
    newUser.confirmRegistration(code, false, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const resendConfirmCode = (email: string) => {
  const newUser = new CognitoUser({
    Username: email,
    Pool: cognitoUserPool
  });
  return new Promise((resolve, reject) => {
    newUser.resendConfirmationCode((err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const signIn = (email: string, password: string): Promise<ISessionResponse> => {
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
      onSuccess(session) {
        return resolve({
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken()
        });
      },
      onFailure(err?: Error | undefined) {
        return reject(err);
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
  idToken: string;
  accessToken: string;
}
const getSession = (): Promise<ISessionResponse> => {
  return new Promise((resolve, reject) => {
    const user = cognitoUserPool.getCurrentUser();
    if (user) {
      user.getSession((err: Error | null, session: CognitoUserSession) => {
        if (err) {
          return reject(err);
        } else {
          if (!session || !session.isValid()) {
            return reject('Session is not valid');
          }
          return resolve({
            idToken: session.getIdToken().getJwtToken(),
            accessToken: session.getAccessToken().getJwtToken()
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
  confirmRegistration,
  resendConfirmCode,
  signIn,
  signOut,
  getSession,
  forgotPassword,
  confirmPassword
};
