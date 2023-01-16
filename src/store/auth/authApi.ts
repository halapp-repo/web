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
import { SignupCode } from '../../models/signup-code';
import { SignupCodeDTO } from '../../models/dtos/signup-code.dto';
import axios from 'axios';
import { plainToClass } from 'class-transformer';

const signUp = (
  email: string,
  password: string,
  code: string,
  organizationId: string
): Promise<ISignUpResult | undefined> => {
  email = email.toUpperCase();
  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email
  });
  const organizationIdAttributes = new CognitoUserAttribute({
    Name: 'custom:organizationId',
    Value: organizationId
  });
  const metaData: ClientMetadata = {
    signupCode: code
  };
  const attributes = [emailAttribute, organizationIdAttributes];

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
  email = email.toUpperCase();
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
  email = email.toUpperCase();
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
interface ISignInResponse extends ISessionResponse {
  user: CognitoUser;
}

const signIn = (
  email: string,
  password: string,
  code?: string | null
): Promise<ISignInResponse> => {
  email = email.toUpperCase();
  const authenticationData: IAuthenticationDetailsData = {
    Username: email,
    Password: password,
    ...(code
      ? {
          ClientMetadata: {
            signupCode: code
          }
        }
      : null)
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
          accessToken: session.getAccessToken().getJwtToken(),
          session,
          user: cognitoUser
        });
      },
      onFailure(err?: Error | undefined) {
        return reject(err);
      }
    });
  });
};

const getCurrentUser = (): CognitoUser | null => {
  return cognitoUserPool.getCurrentUser();
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
  session: CognitoUserSession;
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
            accessToken: session.getAccessToken().getJwtToken(),
            session
          });
        }
      });
    } else {
      return reject('There is no user');
    }
  });
};

const forgotPassword = (email: string): Promise<void> => {
  email = email.toUpperCase();
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
  email = email.toUpperCase();
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

interface UserAttributes {
  ID: string;
  IsAdmin: boolean;
  Email: string;
}
const getUserAttributes = (user: CognitoUser): Promise<UserAttributes> => {
  return new Promise((resolve, reject) => {
    user.getUserAttributes((err, result) => {
      if (err) {
        return reject(err);
      } else if (!result) {
        return reject('Empty attributes');
      } else {
        const att = {} as UserAttributes;
        for (let i = 0; i < result?.length || 0; i++) {
          if (result[i].getName() === 'sub') {
            att['ID'] = result[i].getValue();
            continue;
          } else if (result[i].getName() === 'email') {
            att['Email'] = result[i].getValue();
            continue;
          } else if (result[i].getName() === 'custom:isAdmin') {
            att['IsAdmin'] = result[i].getValue() === 'true';
            continue;
          }
        }
        return resolve(att);
      }
    });
  });
};

class AuthApi {
  baseUrl: string;
  constructor() {
    const baseUrl = process.env.REACT_APP_AUTH_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_AUTH_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
  }
  async getSignupCode(code: string): Promise<SignupCode> {
    return await axios
      .get<SignupCodeDTO>(`/signupcode/${code}`, {
        baseURL: this.baseUrl
      })
      .then((response) => {
        const { data } = response;
        return plainToClass(SignupCode, data);
      });
  }
}

export {
  signUp,
  confirmRegistration,
  resendConfirmCode,
  signIn,
  signOut,
  getSession,
  forgotPassword,
  confirmPassword,
  getUserAttributes,
  AuthApi,
  getCurrentUser
};
