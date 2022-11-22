import { CognitoUserPool } from 'amazon-cognito-identity-js';

const { REACT_APP_COGNITO_USERPOOL_ID, REACT_APP_COGNITO_CLIENT_ID } = process.env;

console.log({
  REACT_APP_COGNITO_USERPOOL_ID,
  REACT_APP_COGNITO_CLIENT_ID
});

const poolData = {
  UserPoolId: REACT_APP_COGNITO_USERPOOL_ID!,
  ClientId: REACT_APP_COGNITO_CLIENT_ID!
};

export default new CognitoUserPool(poolData);
