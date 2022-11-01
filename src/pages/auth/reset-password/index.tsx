import { Box } from '@mui/material';
import AuthCard from '../AuthCard';
import AuthWrapper from '../AuthWrapper';
import { useState } from 'react';
import OTP from './OTP';

const createResetPasswordForm = (stage: number) => {
  switch (stage) {
    case 0:
      return <OTP />;
    case 1:
      return <OTP />;
    case 2:
      return <OTP />;
    default:
      throw new Error('unsuported stage');
  }
};

const ResetPassword = () => {
  const [stage, setStage] = useState(0);
  return (
    <>
      <AuthWrapper>
        <AuthCard>{createResetPasswordForm(stage)}</AuthCard>
      </AuthWrapper>
    </>
  );
};

export default ResetPassword;
