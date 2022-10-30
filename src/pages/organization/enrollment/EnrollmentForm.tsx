import * as Yup from 'yup';
import { Typography, Grid, Stack, Box, Button } from '@mui/material';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { AppTextField } from '../../../components/form/TextField';
import { MuiTelInput } from 'mui-tel-input';
import { AddressField, AddressOutput } from '../../../components/form/AddressField';
import { OrganizationEnrollmentDTO } from '../../../models/dtos/organization-enrollment.dto';

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
  onLocationChanged: (lat: string, lng: string) => void;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, dirty, isValid, setFieldValue, values, setFieldTouched } = props;

  const handlePlaceChanged = (props: AddressOutput) => {
    setFieldValue('organizationName', '');
    setFieldValue('phoneNumber', '');
    setFieldValue('address.zipCode', '');

    if (props.businessStatus) {
      props.name && setFieldValue('organizationName', props.name);
      props.phoneNumber && setFieldValue('phoneNumber', props.phoneNumber);
    }
    props.county && setFieldValue('address.county', props.county);
    if (props.city) {
      setFieldValue('address.city', props.city, true);
      setTimeout(() => setFieldTouched('address.city', true), 500);
    }
    props.zipCode && setFieldValue('address.zipCode', props.zipCode);
    props.country && setFieldValue('address.country', props.country);
    props.lat && props.lng && values.onLocationChanged(`${props.lat}`, `${props.lng}`);
  };

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
                {`Adres bilgileri`}
              </Typography>

              <Field
                name="address.formattedAddress"
                label="Konum"
                component={AddressField}
                onPlaceChanged={handlePlaceChanged}
                placeholder="Konum Girin"
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Field
                  name="address.county"
                  label="ilce"
                  component={AppTextField}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <Field
                  name="address.city"
                  label="il"
                  component={AppTextField}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <Field
                  name="address.zipCode"
                  label="Posta Kodu"
                  component={AppTextField}
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
              </Box>
              <Field name="organizationName" label="Sirket Ismi" component={AppTextField} />
              <Typography variant="h5" color="text.primary" fontWeight="bold">
                {`Kontak bilgileri`}
              </Typography>
              <Field type="email" name="email" label="Email" component={AppTextField} />
              <Field
                defaultCountry="TR"
                name="phoneNumber"
                label="Telefon Numarasi"
                value={props.values.phoneNumber}
                component={MuiTelInput}
                onChange={(value: string) => setFieldValue('phoneNumber', value)}
              />
              <Field type="hidden" name="address.country" />
              <Box sx={{ height: '20px' }} />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                variant="contained">
                Talep Gönder
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

interface EnrollmentFormProps {
  onLocationChanged: (lat: string, lng: string) => void;
  onSubmit: (arg: OrganizationEnrollmentDTO) => void;
}

const EnrollmentForm = withFormik<EnrollmentFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: ({ onLocationChanged }) => {
    return {
      organizationName: '',
      email: '',
      phoneNumber: '',
      address: {
        formattedAddress: '',
        county: '',
        city: '',
        zipCode: '',
        country: ''
      },
      onLocationChanged
    };
  },

  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    organizationName: Yup.string()
      .min(2, 'min 2')
      .max(50, 'max 50')
      .required('Lütfen organizasyon adı giriniz.'),
    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    phoneNumber: Yup.string().required('Lütfen telefonu giriniz.'),
    address: Yup.object().shape({
      formattedAddress: Yup.string().required('Lütfen adres giriniz.'),
      county: Yup.string().required(),
      city: Yup.string()
        .required('Lütfen sehir giriniz.')
        .equals(['İstanbul', 'Istanbul'], 'Sadece istanbul girilebilir'),
      zipCode: Yup.string(),
      country: Yup.string().required()
    })
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    // do submitting things
    props.onSubmit({
      organizationName: values.organizationName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      formattedAddress: values.address.formattedAddress,
      county: values.address.county,
      city: values.address.city,
      zipCode: values.address.zipCode,
      country: values.address.country
    });
    setSubmitting(false);
  }
})(InnerForm);

export { EnrollmentForm };
