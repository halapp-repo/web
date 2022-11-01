import { Box } from '@mui/material';
import AuthCard from '../AuthCard';
import AuthWrapper from '../AuthWrapper';
import { useState } from 'react';
import Email from './Email';
import OTPInput from './OTPInput';

const ResetPassword = () => {
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState('');

  const createResetPasswordForm = (stage: number) => {
    switch (stage) {
      case 0:
        return (
          <Email
            onMoveNextPage={() => {
              setStage(1);
            }}
            setEmail={setEmail}
          />
        );
      case 1:
        return (
          <OTPInput
            email={email}
            onMoveNextPage={() => {
              setStage(2);
            }}
          />
        );
      case 2:
        return <Box />;
      default:
        throw new Error('unsuported stage');
    }
  };
  return (
    <>
      <AuthWrapper>
        <AuthCard
          showPreviousButton={stage !== 0}
          onPrevious={() => {
            if (stage > 0) {
              setStage(stage - 1);
            }
          }}>
          {createResetPasswordForm(stage)}
        </AuthCard>
      </AuthWrapper>
    </>
  );
};

export default ResetPassword;
