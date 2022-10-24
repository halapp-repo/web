import AuthCard from '../AuthCard';
import AuthWrapper from '../AuthWrapper';

const createResetPasswordForm = () => {
  return 'xxx';
};

const ResetPassword = () => {
  return (
    <>
      <AuthWrapper>
        <AuthCard>{createResetPasswordForm()}</AuthCard>
      </AuthWrapper>
    </>
  );
};

export default ResetPassword;
