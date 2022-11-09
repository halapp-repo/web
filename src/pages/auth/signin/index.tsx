import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';
import { SignInForm } from './SignInForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  signIn,
  selectUserAuth,
  confirmRegistration,
  resendConfirmCode
} from '../../../store/auth/authSlice';
import OTPForm from '../OTPForm';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userAuth = useAppSelector(selectUserAuth);

  const handleSignin = async (email: string, password: string): Promise<void> => {
    await dispatch(signIn({ email, password }));
  };

  const handleConfirmSignup = async (otpCode: string): Promise<void> => {
    await dispatch(confirmRegistration({ code: otpCode }));
  };

  const handleResendCode = async () => {
    await dispatch(resendConfirmCode());
  };

  const createSigninForm = () => {
    if (userAuth.authenticated) {
      navigate('/dashboard');
    }
    if (!userAuth.needConfirmation) {
      return <SignInForm onSignin={handleSignin} />;
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
    <>
      <AuthWrapper>
        <AuthCard>{createSigninForm()}</AuthCard>
      </AuthWrapper>
    </>
  );
};

export default SignIn;
