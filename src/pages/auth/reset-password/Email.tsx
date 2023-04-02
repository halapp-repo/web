import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Field, Form, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import { AppTextField } from '../../../components/form/TextField';

interface FormValues {
  email: string;
}

interface InnerFormProps {
  onSubmit: (email: string) => void;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, dirty, isValid } = props;
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
          <Form
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}>
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
  mapPropsToValues: () => {
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

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    await props.onSubmit(values.email);
    setSubmitting(false);
  }
})(InnerForm);

const createEmailForm = (onSubmit: (email: string) => void) => <EmailForm onSubmit={onSubmit} />;

const Email = ({ onSubmit }: { onSubmit: (email: string) => void }) => {
  return <Box>{createEmailForm(onSubmit)}</Box>;
};
export default Email;
