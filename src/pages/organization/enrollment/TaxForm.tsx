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
            {`Şirketinizi halapp'e Ekleyin`}
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
      .min(10, 'En az 10 haneli olmak zorundadir')
      .max(11, 'En cok 11 haneli olmak zorundadir')
      .test({
        test: (v): boolean => {
          if (v?.length === 10) {
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
          } else if (v?.length === 11) {
            if (+v[0] === 0) {
              return false;
            }
            const tekler = +v[0] + +v[2] + +v[4] + +v[6] + +v[8];
            const ciftler = +v[1] + +v[3] + +v[5] + +v[7];
            const basamak10 = (tekler * 7 - ciftler) % 10;
            const toplam = (tekler + ciftler + +v[9]) % 10;

            if (basamak10 != +v[9]) {
              return false;
            }
            if (toplam != +v[10]) {
              return false;
            } else {
              return true;
            }
          } else {
            return false;
          }
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
