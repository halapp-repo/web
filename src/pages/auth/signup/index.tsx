import { useSearchParams } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';
import { SignUpForm } from './SignupForm';
import SignUpWithoutCompanyCode from './SignupWithoutCompanyCode';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { confirmSignUp, selectUserAuth, signUp } from '../../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import OTPForm from '../OTPForm';

const SignUp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userAuth = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = (email: string, password: string) => {
    dispatch(signUp({ email, password }));
  };

  const handleConfirmSignup = async (otpCode: string): Promise<void> => {
    await dispatch(confirmSignUp({ code: otpCode }));
  };

  const createSignupForm = (cmpCode: string | null | undefined) => {
    if (!userAuth.userId) {
      if (cmpCode) {
        return <SignUpForm code={cmpCode} onSignup={handleSignup} />;
      } else {
        return <SignUpWithoutCompanyCode />;
      }
    } else if (userAuth.userId && !userAuth.confirmed) {
      return (
        <OTPForm
          length={6}
          email={userAuth.email}
          onSubmit={handleConfirmSignup}
          onMoveNextPage={() => navigate('/dashboard')}
        />
      );
    } else {
      navigate('/dashboard');
    }
  };

  const cmpCode = searchParams.get('cmpcode');

  return (
    <AuthWrapper>
      <AuthCard showPreviousButton={false} showNextButton={false}>
        {createSignupForm(cmpCode)}
      </AuthCard>
    </AuthWrapper>
  );
};

export default SignUp;
