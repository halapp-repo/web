import { promisify } from 'util';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import cognitoUserPool from '../../aws/CognitoUserPool';

const signUp = (email: string, password: string) => {
  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email
  });

  const attributes = [emailAttribute];

  const promisifiedSignUp = promisify(cognitoUserPool.signUp).bind(cognitoUserPool);

  return promisifiedSignUp(email, password, attributes, []);
};

const confirmSignup = (user: CognitoUser, code: string) => {
  const promisifiedConfirmSignup = promisify(user.confirmRegistration).bind(user);
  promisifiedConfirmSignup(code, false);
};

export { signUp, confirmSignup };
