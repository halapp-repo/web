import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';
import { Organization } from '../../../models/organization';

interface FormValues {
  vkn: string;
  organizationName: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Typography variant="h4" color="text.primary" fontWeight="bold">
            {`Şirketinizi HalApp'e Ekleyin`}
          </Typography>
          <Form
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}>
            <Stack spacing={2}>
              <Typography variant="h5" color="text.primary" fontWeight="bold">
                {`Şirket bilgisi`}
              </Typography>
              <Field
                name="vkn"
                label="Vergi kimlik no"
                component={AppTextField}
                InputLabelProps={{ shrink: true }}
              />
              <Field
                name="organizationName"
                label="Şirket ismi"
                component={AppTextField}
                InputLabelProps={{ shrink: true }}
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
  onSubmit: (vkn: string, organizationName: string) => void;
}

const TaxForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    const vkn = props.organization.VKN || '';
    const organizationName = props.organization.Name || '';
    return {
      vkn,
      organizationName
    };
  },
  validateOnMount: true,
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    vkn: Yup.string()
      .length(10, '10 haneli olmak zorundadir')
      .test({
        test: (v): boolean => {
          let sum = 0;
          if (v && v.length == 10 && !isNaN(+v)) {
            const lastDigit = +v[9];
            for (let i = 0; i < 9; i++) {
              const digit = +v[i];
              const tmp = (digit + 10 - (i + 1)) % 10;
              sum = tmp == 9 ? sum + tmp : sum + ((tmp * Math.pow(2, 10 - (i + 1))) % 9);
            }
            return lastDigit == (10 - (sum % 10)) % 10;
          }
          return false;
        },
        message: 'Gecersiz vergi kimlik no'
      })
      .required('Vergi kimlik no gerekli'),
    organizationName: Yup.string()
      .min(2, 'min 2')
      .max(50, 'max 50')
      .required('Lütfen sirket ismi giriniz.')
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    props.onSubmit(values.vkn, values.organizationName);
    setSubmitting(false);
  }
})(InnerForm);

export { TaxForm };
