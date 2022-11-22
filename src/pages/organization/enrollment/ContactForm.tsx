import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { MuiTelInput } from 'mui-tel-input';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';
import { Organization } from '../../../models/organization';

interface FormValues {
  email: string;
  phoneNumber: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, setFieldValue } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Typography variant="h4" color="text.primary" fontWeight="bold">
            {`İletişim bilgileri`}
          </Typography>
          <Form
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}>
            <Stack spacing={2}>
              <Field
                type="email"
                name="email"
                label="E-posta"
                component={AppTextField}
                sx={{ dispay: 'flex', width: '100%' }}
              />
              <Field
                defaultCountry="TR"
                name="phoneNumber"
                label="Telefon numarasi"
                value={props.values.phoneNumber}
                component={MuiTelInput}
                onChange={(value: string) => setFieldValue('phoneNumber', value)}
              />
              <Box sx={{ height: '20px' }} />
              <Button type="submit" disabled={isSubmitting || !isValid} variant="contained">
                Devam et
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Grid>
    </Grid>
  );
};

interface MyFormProps {
  organization: Organization;
  onSubmit: (email: string, phoneNumber: string) => Promise<void>;
}

const ContactForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    const email = props.organization.Email || '';
    const phoneNumber = props.organization.PhoneNumber || '';
    return {
      email,
      phoneNumber
    };
  },
  validateOnMount: true,
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    phoneNumber: Yup.string().required('Lütfen telefonu giriniz.')
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    setSubmitting(false);
    props.onSubmit(values.email, values.phoneNumber);
  }
})(InnerForm);

export { ContactForm };
