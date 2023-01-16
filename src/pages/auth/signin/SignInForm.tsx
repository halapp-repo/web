import { Typography, Grid, Stack, Box, Button, Chip } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';
import { NavLink } from 'react-router-dom';
import { SignupCode } from '../../../models/signup-code';
import { ShopOutlined } from '@ant-design/icons';

interface FormValues {
  email: string;
  password: string;
  code?: SignupCode | null;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, values } = props;
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
          {values.code && values.code.isActive() && (
            <Chip
              icon={<ShopOutlined />}
              color={'success'}
              label={values.code.OrganizationName}
              variant="outlined"
            />
          )}
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

              <Button type="submit" disabled={isSubmitting || !isValid} variant="contained">
                {'Giriş Yap'}
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

interface MyFormProps {
  onSignin: (email: string, password: string, code?: SignupCode | null) => Promise<void>;
  code?: SignupCode | null;
}

const SignInForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: '',
      password: '',
      code: props.code
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
      .required('sifre gerekli')
  }),
  validateOnMount: true,
  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    await props.onSignin(values.email, values.password, values.code);
    setSubmitting(false);
  }
})(InnerForm);

export { SignInForm };
