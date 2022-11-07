import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';

interface FormValues {
  email: string;
  password: string;
  code: string;
  onSignup: (email: string, password: string, code: string) => Promise<void>;
}

const InnerForm = (props: FormikProps<FormValues>) => {
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
            {'Kayıt Ol'}
          </Typography>
          <Form
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}>
            <Stack spacing={1}>
              <Field type="email" name="email" label="Email" component={AppTextField} />
              <Field type="password" name="password" label="Sifre" component={AppTextField} />
              <Field type="hidden" name="code" />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                variant="contained">
                {'Kaydet'}
              </Button>
              <Box sx={{ height: '50px' }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body1">{"HalApp'e üyeyseniz"}</Typography>
                <Button variant="text" component={RouterLink} to="/signin">
                  {'Giris yap'}
                </Button>
              </Box>
            </Stack>
          </Form>
        </Stack>
      </Grid>
    </Grid>
  );
};

interface MyFormProps {
  code: string;
  onSignup: (email: string, password: string, code: string) => Promise<void>;
}

const SignUpForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props: MyFormProps) => {
    return {
      email: '',
      password: '',
      code: props.code,
      onSignup: props.onSignup
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Şifreniz en az 6 karakter olmalı. Büyük, küçük harf ve rakam içermelidir.'
      )
      .required('sifre gerekli'),
    code: Yup.string().required('Required')
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    await props.onSignup(values.email, values.password, values.code);
    setSubmitting(false);
  }
})(InnerForm);

export { SignUpForm };
