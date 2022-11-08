import AuthCard from '../AuthCard';
import AuthWrapper from '../AuthWrapper';
import { useState } from 'react';
import Email from './Email';
import { useAppDispatch } from '../../../store/hooks';
import { forgotPassword } from '../../../store/auth/authSlice';
import OTPForm from '../OTPForm';
import { NewPasswordForm } from './NewPassword';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleforgotPassword = async (email: string): Promise<void> => {
    await dispatch(forgotPassword({ email }));
  };
  const handleConfirmNewPassword = async (email: string, password: string, otp: string) => {
    true;
  };

  const createResetPasswordForm = (stage: number) => {
    switch (stage) {
      case 0:
        return (
          <Email
            onMoveNextPage={() => {
              setStage(1);
            }}
            setEmail={setEmail}
            onForgotPassword={handleforgotPassword}
          />
        );
      case 1:
        return (
          <OTPForm
            length={6}
            onSubmit={async (code) => {
              setOtp(code);
            }}
            onResendCode={() => handleforgotPassword(email)}
            email={email}
            onMoveNextPage={() => {
              setStage(2);
            }}
          />
        );
      case 2:
        return <NewPasswordForm email={email} otp={otp} onSubmit={handleConfirmNewPassword} />;
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
