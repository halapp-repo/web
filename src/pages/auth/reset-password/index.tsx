import AuthCard from '../AuthCard';
import AuthWrapper from '../AuthWrapper';
import { useState, useEffect } from 'react';
import Email from './Email';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearStatusAndError,
  confirmPassword,
  forgotPassword,
  selectUserAuth
} from '../../../store/auth/authSlice';
import OTPForm from '../OTPForm';
import { NewPasswordForm } from './NewPassword';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const userAuth = useAppSelector(selectUserAuth);

  useEffect(() => {
    dispatch(clearStatusAndError());
  }, []);

  useEffect(() => {
    if (userAuth.status === 'ForgotPasswordFulfilled') {
      setStage(1);
      dispatch(clearStatusAndError());
    } else if (userAuth.status === 'confirmPasswordFulfilled') {
      setStage(3);
      dispatch(clearStatusAndError());
    }
  }, [userAuth]);

  const handleforgotPassword = async (email: string): Promise<void> => {
    setEmail(email);
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
  };

  const createResetPasswordForm = (stage: number) => {
    switch (stage) {
      case 0:
        return <Email onSubmit={handleforgotPassword} />;
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
