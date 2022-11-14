import AuthCard from '../AuthCard';
import AuthWrapper from '../AuthWrapper';
import { useState, useEffect } from 'react';
import Email from './Email';
import { useAppDispatch } from '../../../store/hooks';
import { clearError, confirmPassword, forgotPassword } from '../../../store/auth/authSlice';
import OTPForm from '../OTPForm';
import { NewPasswordForm } from './NewPassword';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleforgotPassword = async (email: string): Promise<void> => {
    await dispatch(forgotPassword({ email }));
  };
  const handleConfirmNewPassword = async (email: string, password: string, otp: string) => {
    await dispatch(
      confirmPassword({
        email,
        otp,
        password
      })
    );
    setStage(3);
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
      case 3:
        navigate('/auth/signin');
        break;
      default:
        throw new Error('unsuported stage');
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

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
