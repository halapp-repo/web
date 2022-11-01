import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';
import { NavLink } from 'react-router-dom';

import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';

interface FormValues {
  email: string;
  password: string;
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
            {'Giriş yap veya kayıt ol'}
          </Typography>
          <Form>
            <Stack spacing={2}>
              <Field type="email" name="email" label="Email" component={AppTextField} />
              <Box sx={{ display: 'block' }}>
                <Field
                  type="password"
                  name="password"
                  label="Sifre"
                  component={AppTextField}
                  sx={{ width: '100%' }}
                />
                <Button
                  component={NavLink}
                  to={'/auth/resetpassword'}
                  sx={{
                    whiteSpace: 'nowrap',
                    minWidth: 'auto',
                    float: 'right',
                    clear: 'right'
                  }}>
                  {'Şifremi unuttum'}
                </Button>
              </Box>

              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                variant="contained">
                {'Kaydet'}
              </Button>

              <Box sx={{ height: '50px' }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body1">{'Hala üye olmadınız mı?'}</Typography>
                <Button variant="text" component={RouterLink} to="/organization/enrollment">
                  {'Üye Ol'}
                </Button>
              </Box>
            </Stack>
          </Form>
        </Stack>
      </Grid>
    </Grid>
  );
};

const SignInForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: '',
      password: ''
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    password: Yup.string().required('gerekli')
  }),

  handleSubmit: (values) => {
    // do submitting things
  }
})(InnerForm);

const createSigninForm = () => <SignInForm />;

const SignIn = () => {
  return (
    <>
      <AuthWrapper>
        <AuthCard>{createSigninForm()}</AuthCard>
      </AuthWrapper>
    </>
  );
};

export default SignIn;
