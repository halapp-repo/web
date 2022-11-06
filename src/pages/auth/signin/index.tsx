import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';
import { SignInForm } from './SignInForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signIn } from '../../../store/auth/authSlice';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const handleSignin = async (email: string, password: string): Promise<void> => {
    await dispatch(signIn({ email, password }));
  };

  const createSigninForm = () => <SignInForm onSignin={handleSignin} />;

  return (
    <>
      <AuthWrapper>
        <AuthCard>{createSigninForm()}</AuthCard>
      </AuthWrapper>
    </>
  );
};

export default SignIn;
