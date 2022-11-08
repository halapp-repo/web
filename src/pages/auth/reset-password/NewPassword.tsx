import { Typography, Grid, Stack, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';

interface FormValues {
  email: string;
  otp: string;
  password: string;
}

const NewPassword = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, dirty, isValid } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: 'flex', justifyContent: 'center' }}>
            {'Yeni Şifre'}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: 'flex', justifyContent: 'center' }}>
            {'Şifre yenilemek icin yeni sifreniniz giriniz'}
          </Typography>
          <Form
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}>
            <Stack spacing={2}>
              <Field
                type="password"
                name="password"
                label="Sifre"
                component={AppTextField}
                sx={{ width: '100%' }}
              />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                variant="contained">
                {'Sifre yenile'}
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Grid>
    </Grid>
  );
};

interface MyFormProps {
  onSubmit: (email: string, password: string, otp: string) => Promise<void>;
  email: string;
  otp: string;
}

const NewPasswordForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.email,
      otp: props.otp,
      password: ''
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string().required(),
    otp: Yup.string().required(),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Şifreniz en az 6 karakter olmalı. Büyük, küçük harf ve rakam içermelidir.'
      )
      .required('sifre gerekli')
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    await props.onSubmit(values.email, values.password, values.otp);
    setSubmitting(false);
  }
})(NewPassword);

export { NewPasswordForm };
