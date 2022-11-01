import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';

interface FormValues {
  email: string;
}

interface InnerFormProps {
  onMoveNextPage: () => void;
  setEmail: (value: string) => void;
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
            {'Şifre Yenileme'}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: 'flex', justifyContent: 'center' }}>
            {'Şifre yenileme bağlantısını gönderebilmemiz için email adresinize ihtiyacımız var.'}
          </Typography>
          <Form>
            <Stack spacing={2}>
              <Field type="email" name="email" label="Email" component={AppTextField} />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                variant="contained">
                {'Şifremi Yenile'}
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Grid>
    </Grid>
  );
};

const EmailForm = withFormik<InnerFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: ''
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz.')
      .required('Lütfen email adresinizi giriniz.')
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    // do submitting things
    props.setEmail(values.email);
    props.onMoveNextPage();
    setSubmitting(false);
  }
})(InnerForm);

const createEmailForm = (onMoveNextPage: () => void, setEmail: (value: string) => void) => (
  <EmailForm onMoveNextPage={onMoveNextPage} setEmail={setEmail} />
);

const Email = ({
  onMoveNextPage,
  setEmail
}: {
  onMoveNextPage: () => void;
  setEmail: (value: string) => void;
}) => {
  return <Box>{createEmailForm(onMoveNextPage, setEmail)}</Box>;
};
export default Email;
