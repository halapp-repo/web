import { Box } from '@mui/material';
import OTPInput from '../../../components/form/otp-input';

const OTP = () => {
  return (
    <Box>
      <OTPInput
        autoFocus={true}
        length={5}
        onChangeOTP={(otp) => console.log('Number OTP: ', otp)}
      />
    </Box>
  );
};
export default OTP;
