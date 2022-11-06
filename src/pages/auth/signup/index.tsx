import { useSearchParams } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';
import { SignUpForm } from './SignupForm';
import SignUpWithoutCompanyCode from './SignupWithoutCompanyCode';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  confirmSignUp,
  resendConfirmCode,
  selectUserAuth,
  signUp
} from '../../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import OTPForm from '../OTPForm';

const SignUp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userAuth = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string, code: string): Promise<void> => {
    await dispatch(signUp({ email, password, code }));
  };

  const handleConfirmSignup = async (otpCode: string): Promise<void> => {
    await dispatch(confirmSignUp({ code: otpCode }));
  };

  const handleResendCode = async () => {
    await dispatch(resendConfirmCode());
  };

  const createSignupForm = (signupCode: string | null | undefined) => {
    if (!userAuth.userId) {
      if (signupCode) {
        return <SignUpForm code={signupCode} onSignup={handleSignup} />;
      } else {
        return <SignUpWithoutCompanyCode />;
      }
    } else if (userAuth.userId && !userAuth.confirmed) {
      return (
        <OTPForm
          length={6}
          email={userAuth.email}
          onSubmit={handleConfirmSignup}
          onResendCode={handleResendCode}
          onMoveNextPage={() => navigate('/dashboard')}
        />
      );
    } else {
      navigate('/dashboard');
    }
  };

  const signupCode = searchParams.get('code');

  return (
    <AuthWrapper>
      <AuthCard showPreviousButton={false} showNextButton={false}>
        {createSignupForm(signupCode)}
      </AuthCard>
    </AuthWrapper>
  );
};

export default SignUp;
