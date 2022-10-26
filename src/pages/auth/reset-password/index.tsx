import { Box } from '@mui/material';
import AuthCard from '../AuthCard';
import AuthWrapper from '../AuthWrapper';
import OTP from './OTP';

const createResetPasswordForm = () => {
  return <OTP />;
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
