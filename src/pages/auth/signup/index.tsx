import { Typography, Grid, Stack, TextField, Button } from '@mui/material';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import { AppTextField } from '../../../components/form/TextField';

import AuthWrapper from '../AuthWrapper';
import AuthCard from '../AuthCard';

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
            Kayit Ol
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
                Submit
              </Button>
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

const MyForm = withFormik<MyFormProps, FormValues>({
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
    fullName: Yup.string().min(2, 'min 2').max(50, 'max 50').required('isim ve soyisim gerekli'),
    email: Yup.string().email('gecersiz email').required('email gerekli'),
    password: Yup.string().required('gerekli'),
    code: Yup.string().required('Required')
  }),

  handleSubmit: (values) => {
    // do submitting things
  }
})(InnerForm);

const createSignupForm = (code: string | null | undefined) => {
  if (code) {
    return <MyForm code={code} />;
  } else {
    return <div>xxx</div>;
  }
};

const SignUp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  return (
    <>
      <AuthWrapper>
        <AuthCard>{createSignupForm(code)}</AuthCard>
      </AuthWrapper>
    </>
  );
};

export default SignUp;
