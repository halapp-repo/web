import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';
import { MuiTelInput } from 'mui-tel-input';
import { AddressField, AddressOutput } from '../../../components/form/AddressField';

interface OrganizationAddress {
  formattedAddress: string;
  county: string;
  city: string;
  zipCode: string;
  country: string;
}

interface FormValues {
  organizationName: string;
  email: string;
  phoneNumber: string;
  address: OrganizationAddress;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, dirty, isValid, setFieldValue } = props;

  const handlePlaceChanged = (props: AddressOutput) => {
    if (props.businessStatus) {
      props.name && setFieldValue('organizationName', props.name);
      props.phoneNumber && setFieldValue('phoneNumber', props.phoneNumber);
    }
    props.county && setFieldValue('county', props.county);
    props.city && setFieldValue('city', props.city);
    props.zipCode && setFieldValue('zipCode', props.zipCode);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Typography
            variant="h4"
            color="text.secondary"
            fontWeight="bold"
            sx={{ display: 'flex', justifyContent: 'center' }}>
            {`Şirketinizi HalApp'e Ekleyin`}
          </Typography>
          <Form>
            <Stack spacing={2}>
              <Field name="organizationName" label="Sirket Ismi" component={AppTextField} />
              <Field
                name="address.formattedAddress"
                label="Adres"
                component={AddressField}
                onPlaceChanged={handlePlaceChanged}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Field
                  name="county"
                  label="ilce"
                  component={AppTextField}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <Field
                  name="city"
                  label="il"
                  component={AppTextField}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <Field
                  name="zipCode"
                  label="Posta Kodu"
                  component={AppTextField}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Box>
              <Field type="email" name="email" label="Email" component={AppTextField} />
              <Field
                defaultCountry="TR"
                name="phoneNumber"
                label="Telefon Numarasi"
                value={props.values.phoneNumber}
                component={MuiTelInput}
                onChange={(value: string) => setFieldValue('phoneNumber', value)}
              />
              <Field type="hidden" name="country" />
              <Box sx={{ height: '20px' }} />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                variant="contained">
                Kaydet
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

const PreSignUpForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      email: '',
      organizationName: '',
      phoneNumber: '',
      address: {
        formattedAddress: ''
      }
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    organizationName: Yup.string()
      .min(2, 'min 2')
      .max(50, 'max 50')
      .required('Lütfen ad ve soyadınızı giriniz.'),
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    phoneNumber: Yup.string().required('Lütfen telefonu giriniz.')
  }),

  handleSubmit: (values) => {
    // do submitting things
  }
})(InnerForm);

export { PreSignUpForm };
