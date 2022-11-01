import { useSearchParams } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';
import { SignUpForm } from './SignupForm';
import SignUpWithoutCode from './SignupWithoutCode';

const createSignupForm = (code: string | null | undefined) => {
  if (code) {
    return (
      <AuthWrapper>
        <AuthCard>
          <SignUpForm code={code} />
        </AuthCard>
      </AuthWrapper>
    );
  } else {
    return (
      <AuthWrapper>
        <SignUpWithoutCode />
      </AuthWrapper>
    );
  }
};

const SignUp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  return <>{createSignupForm(code)}</>;
};

export default SignUp;
