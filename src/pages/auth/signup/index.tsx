import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';
import { SignUpForm } from './SignupForm';
import SignUpWithoutCompanyCode from './SignupWithoutCompanyCode';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearError,
  confirmRegistration,
  resendConfirmCode,
  SelectSignupCode,
  selectUserAuth,
  signUp
} from '../../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import OTPForm from '../OTPForm';
import { getSignupCodeDetails } from '../../../store/auth/authSlice';
import { SignupCode } from '../../../models/signup-code';

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const signupCode = useAppSelector(SelectSignupCode);
  const userAuth = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string, code: string): Promise<void> => {
    await dispatch(signUp({ email, password, code }));
  };

  const handleConfirmSignup = async (otpCode: string): Promise<void> => {
    await dispatch(confirmRegistration({ code: otpCode }));
  };

  const handleResendCode = async () => {
    await dispatch(resendConfirmCode());
  };

  useEffect(() => {
    const code = searchParams.get('code');
    if (code && typeof signupCode === 'undefined') {
      dispatch(getSignupCodeDetails({ code }));
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const createSignupForm = (signupCode: SignupCode | undefined | null) => {
    if (!userAuth.email) {
      if (signupCode) {
        return <SignUpForm code={signupCode} onSignup={handleSignup} />;
      } else {
        return <SignUpWithoutCompanyCode />;
      }
    } else if (userAuth.email && userAuth.needConfirmation) {
      return (
        <OTPForm
          length={6}
          email={userAuth.email}
          onSubmit={handleConfirmSignup}
          onResendCode={handleResendCode}
          onMoveNextPage={() => navigate('/dashboard')}
        />
      );
    } else if (userAuth.email && !userAuth.needConfirmation && userAuth.confirmed) {
      navigate('/auth/signin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <AuthWrapper>
      <AuthCard showPreviousButton={false} showNextButton={false}>
        {createSignupForm(signupCode)}
      </AuthCard>
    </AuthWrapper>
  );
};

export default SignUp;
