import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Field, Form, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import OTPInputText from '../../components/form/otp-input';

interface FormValues {
  otp: string;
  email: string;
  length: number;
  onResendCode: () => void;
}

interface InnerFormProps {
  onMoveNextPage: () => void;
  onSubmit: (code: string) => Promise<void>;
  onResendCode: () => void;
  email: string;
  length: number;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { dirty, isSubmitting, isValid, values, setFieldValue, setFieldTouched } = props;
  const handleOTPChanges = (otp: string) => {
    setFieldTouched('otp', true);
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
                {`E-postanızı doğrulamak için ${values.email}'a gelen onay kodunuzu giriniz`}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <OTPInputText autoFocus={true} length={values.length} onChangeOTP={handleOTPChanges} />
          </Box>
          <Box>
            <Form
              onKeyPress={(e) => {
                e.which === 13 && e.preventDefault();
              }}>
              <Field type="hidden" name="otp" />
              <Stack spacing={2}>
                <Button
                  sx={{ width: '100%' }}
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  variant="contained">
                  {'Onayla'}
                </Button>
                <Button
                  sx={{ width: '100%' }}
                  type="submit"
                  variant="contained"
                  onClick={values.onResendCode}>
                  {'Tekrar onay kodu gönder'}
                </Button>
              </Stack>
            </Form>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

const OTPInputForm = withFormik<InnerFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: ({ email, length, onResendCode }) => {
    return {
      otp: '',
      email,
      length,
      onResendCode
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: (props: FormValues) => {
    return Yup.object().shape({
      otp: Yup.string().min(props.length).required()
    });
  },

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    await props.onSubmit(values.otp);
    props.onMoveNextPage();
    setSubmitting(false);
  }
})(InnerForm);

const createEmailForm = (
  onMoveNextPage: () => void,
  onSubmit: (code: string) => Promise<void>,
  onResendCode: () => void,
  email: string,
  length: number
) => (
  <OTPInputForm
    onMoveNextPage={onMoveNextPage}
    onResendCode={onResendCode}
    onSubmit={onSubmit}
    email={email}
    length={length}
  />
);

const OTPForm = ({
  onMoveNextPage,
  onSubmit,
  onResendCode,
  email,
  length
}: {
  onMoveNextPage: () => void;
  onSubmit: (code: string) => Promise<void>;
  onResendCode: () => void;
  email: string;
  length: number;
}) => {
  return <Box>{createEmailForm(onMoveNextPage, onSubmit, onResendCode, email, length)}</Box>;
};
export default OTPForm;
