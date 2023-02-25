import { Grid } from '@mui/material';
import { withFormik, FormikProps, Form } from 'formik';
import * as Yup from 'yup';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormValues {}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, setFieldValue, setFieldTouched, values } = props;
  return (
    <Form
      onKeyPress={(e) => {
        e.which === 13 && e.preventDefault();
      }}>
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} sm={12} md={6}>
          {'XX'}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          {'YYY'}
        </Grid>
      </Grid>
    </Form>
  );
};

interface MyFormProps {
  onSubmit: () => void;
}
const PaymentForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({}),
  validateOnMount: false,
  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    setSubmitting(false);
  }
})(InnerForm);

export { PaymentForm };
