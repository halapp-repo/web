import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { SignupCode } from '../../../models/signup-code';
import {
  clearStatusAndError,
  confirmRegistration,
  getSignupCodeDetails,
  resendConfirmCode,
  SelectSignupCode,
  selectUserAuth,
  signIn
} from '../../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchById } from '../../../store/users/usersSlice';
import AuthCard from '../AuthCard';
import AuthWrapper from '../AuthWrapper';
import OTPForm from '../OTPForm';
import { SignInForm } from './SignInForm';

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userAuth = useAppSelector(selectUserAuth);
  const signupCode = useAppSelector(SelectSignupCode);

  const handleSignin = async (
    email: string,
    password: string,
    code?: SignupCode | null
  ): Promise<void> => {
    await dispatch(signIn({ email, password, code }));
  };

  const handleConfirmSignup = async (otpCode: string): Promise<void> => {
    await dispatch(confirmRegistration({ code: otpCode }));
  };

  const handleResendCode = async () => {
    await dispatch(resendConfirmCode());
  };

  useEffect(() => {
    dispatch(clearStatusAndError());
  }, []);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code && typeof signupCode === 'undefined') {
      dispatch(getSignupCodeDetails({ code }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (userAuth.id && userAuth.authenticated) {
      dispatch(
        fetchById({
          userId: userAuth.id,
          isMyProfile: true
        })
      ).then(() => navigate('/dashboard'));
    }
  }, [userAuth]);

  const createSigninForm = () => {
    if (!userAuth.needConfirmation) {
      return <SignInForm code={signupCode} onSignin={handleSignin} />;
    } else if (userAuth.needConfirmation && userAuth.email) {
      return (
        <OTPForm
          length={6}
          email={userAuth.email}
          onSubmit={handleConfirmSignup}
          onResendCode={handleResendCode}
          onMoveNextPage={() => {
            return true;
          }}
        />
      );
    }
  };

  return (
    <AuthWrapper>
      <AuthCard>{createSigninForm()}</AuthCard>
    </AuthWrapper>
  );
};

export default SignIn;
