import { Typography, Grid, Stack, Button, Divider } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Organization } from '../../../models/organization';

interface FormValues {
  organization: Organization;
}

interface PreviewItemProps {
  name: string;
  title: string;
  content: string;
  content2?: string;
}

const PreviewItem = ({ name, title, content, content2 }: PreviewItemProps) => {
  return (
    <>
      <Stack spacing={1}>
        <Divider textAlign="left" sx={{ fontSize: 'smaller' }}>
          {title}
        </Divider>
        <Typography color="text.primary" fontWeight="bold">
          {content}
        </Typography>
        {content2 && (
          <Typography color="text.primary" fontWeight="bold">
            {content2}
          </Typography>
        )}
      </Stack>
      <Field type="hidden" name={name} />
    </>
  );
};

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, values } = props;
  const { organization } = values;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Typography variant="h4" color="text.primary" fontWeight="bold">
            {`Şirket bilgilerini gözden geçirin`}
          </Typography>
          <Form
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}>
            <Stack spacing={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <PreviewItem
                      name="organization.VKN"
                      title={'Vergi kimlik no'}
                      content={organization.VKN!}
                    />
                    <PreviewItem
                      name="organization.Name"
                      title={'Şirket ismi'}
                      content={organization.Name!}
                    />
                    <PreviewItem
                      name="organization.Email"
                      title={'E-mail'}
                      content={organization.Email!}
                    />
                    <PreviewItem
                      name="organization.PhoneNumber"
                      title={'Telefon'}
                      content={organization.PhoneNumber!}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <PreviewItem
                      name="organization.InvoiceAddress"
                      title={'Fatura adresi'}
                      content={`${organization.InvoiceAddress?.AddressLine}`}
                      content2={`${organization.InvoiceAddress?.County}  ${organization.InvoiceAddress?.City}  ${organization.InvoiceAddress?.ZipCode}  ${organization.InvoiceAddress?.Country}`}
                    />
                    <PreviewItem
                      name="organization.CompanyAddress"
                      title={'Şirket adresi'}
                      content={`${organization.CompanyAddress?.AddressLine}`}
                      content2={`${organization.CompanyAddress?.County}  ${organization.CompanyAddress?.City}  ${organization.CompanyAddress?.ZipCode}  ${organization.CompanyAddress?.Country}`}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Button type="submit" disabled={isSubmitting || !isValid} variant="contained">
                Talep Gönder
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
  onSubmit: (organization: Organization) => Promise<void>;
}

const PreviewForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      organization: props.organization
    };
  },
  validateOnMount: true,
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    organization: Yup.object().shape({
      Email: Yup.string().required()
    })
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    props.onSubmit(values.organization);
    setSubmitting(false);
  }
})(InnerForm);

export { PreviewForm };
