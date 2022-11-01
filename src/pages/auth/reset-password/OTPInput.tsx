import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import OTPInputText from '../../../components/form/otp-input';

interface FormValues {
  otp: string;
  email: string;
}

interface InnerFormProps {
  onMoveNextPage: () => void;
  email: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, values, setFieldValue } = props;
  const handleOTPChanges = (otp: string) => {
    setFieldValue('otp', otp);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Box>
            <Stack spacing={1}>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="bold"
                sx={{ display: 'flex', justifyContent: 'center' }}>
                {'Dogrulama kodu gönderildi'}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight="bold"
                sx={{ display: 'flex', justifyContent: 'center' }}>
                {`${values.email} adresine şifre yenileme kodunuz gönderildi.`}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <OTPInputText autoFocus={true} length={5} onChangeOTP={handleOTPChanges} />
          </Box>
          <Box>
            <Form
              onKeyPress={(e) => {
                e.which === 13 && e.preventDefault();
              }}>
              <Field type="hidden" name="otp" />
              <Button
                sx={{ width: '100%' }}
                type="submit"
                disabled={isSubmitting || !isValid}
                variant="contained">
                {'Kodu Gir'}
              </Button>
            </Form>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

const OTPInputForm = withFormik<InnerFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: ({ email }) => {
    return {
      otp: '',
      email
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    otp: Yup.string().min(5).required()
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    // do submitting things
    props.onMoveNextPage();
    setSubmitting(false);
  }
})(InnerForm);

const createEmailForm = (onMoveNextPage: () => void, email: string) => (
  <OTPInputForm onMoveNextPage={onMoveNextPage} email={email} />
);

const OTPInput = ({ onMoveNextPage, email }: { onMoveNextPage: () => void; email: string }) => {
  return <Box>{createEmailForm(onMoveNextPage, email)}</Box>;
};
export default OTPInput;
