import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  code: string;
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
          <Form>
            <Stack spacing={1}>
              <Field name="fullName" label="Isim ve Soyisim" component={AppTextField} />
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
}

const SignUpForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: '',
      password: '',
      fullName: '',
      code: props.code
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'min 2')
      .max(50, 'max 50')
      .required('Lütfen ad ve soyadınızı giriniz.'),
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    password: Yup.string().required('gerekli'),
    code: Yup.string().required('Required')
  }),

  handleSubmit: (values) => {
    // do submitting things
  }
})(InnerForm);

export { SignUpForm };
