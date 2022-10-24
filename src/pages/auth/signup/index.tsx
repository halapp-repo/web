import { useSearchParams } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';
import { SignUpForm } from './signupForm';

const createSignupForm = (code: string | null | undefined) => {
  if (code) {
    return <SignUpForm code={code} />;
  } else {
    return <div>{'xxx'}</div>;
  }
};

const SignUp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  return (
    <>
      <AuthWrapper>
        <AuthCard>{createSignupForm(code)}</AuthCard>
      </AuthWrapper>
    </>
  );
};

export default SignUp;
