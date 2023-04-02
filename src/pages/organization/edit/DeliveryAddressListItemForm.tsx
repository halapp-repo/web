import { Box, Button, Grid, ListItem, ListItemText, Stack } from '@mui/material';
import { Field, Form, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import {
  AddressFieldWithPlaceFromQuery,
  AddressOutput
} from '../../../components/form/AddressFieldWithPlaceFromQuery';
import { AppTextField } from '../../../components/form/TextField';
import { OrganizationAddress } from '../../../models/organization';

interface FormValues {
  addressLine: string;
  county: string;
  city: string;
  zipCode: string;
  country: string;
  OnCancel: () => void;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, setFieldValue, setFieldTouched, values } = props;
  return (
    <ListItem>
      <ListItemText
        primary={
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Form
                  onKeyPress={(e) => {
                    e.which === 13 && e.preventDefault();
                  }}>
                  <Stack spacing={2}>
                    <Box>
                      <Stack spacing={2}>
                        <Field
                          name="addressLine"
                          label="Adres"
                          component={AddressFieldWithPlaceFromQuery}
                          onPlaceChanged={(e: (AddressOutput | null)[]) => {
                            if (e && e.length === 1) {
                              if (e[0]?.county) {
                                setFieldValue('county', e[0]?.county);
                                setTimeout(() => setFieldTouched('county', true), 500);
                              }
                              if (e[0]?.zipCode) {
                                setFieldValue('zipCode', e[0]?.zipCode);
                                setTimeout(() => setFieldValue('zipCode', e[0]?.zipCode), 500);
                              }
                              if (e[0]?.city) {
                                setFieldValue('city', e[0]?.city);
                                setTimeout(() => setFieldTouched('city', true), 500);
                              }
                            }
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Field
                            name="county"
                            label="ilçe"
                            component={AppTextField}
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field
                            name="city"
                            label="il"
                            component={AppTextField}
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field
                            name="zipCode"
                            label="Posta Kodu"
                            component={AppTextField}
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field type="hidden" name="country" />
                        </Box>
                      </Stack>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                      <Button color="blackNWhite" variant="outlined" onClick={values.OnCancel}>
                        {'Iptal'}
                      </Button>
                      <Button type="submit" disabled={isSubmitting || !isValid} variant="contained">
                        {'Kaydet'}
                      </Button>
                    </Box>
                  </Stack>
                </Form>
              </Stack>
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
};

interface DeliveryAddressListItemFormProps {
  Address?: OrganizationAddress;
  OnCancel: () => void;
  OnEdit?: (address: OrganizationAddress) => void;
}

const DeliveryAddressListItemForm = withFormik<DeliveryAddressListItemFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      addressLine: props.Address?.AddressLine || '',
      county: props.Address?.County || '',
      city: props.Address?.City || '',
      zipCode: props.Address?.ZipCode || '',
      country: 'Türkiye',
      OnCancel: props.OnCancel
    };
  },
  validateOnMount: true,
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.lazy(() => {
    return Yup.object().shape({
      addressLine: Yup.string().required('Lütfen adres giriniz.'),
      county: Yup.string().required().required('Lütfen ilce giriniz.'),
      city: Yup.string().required('Lütfen sehir giriniz.'),
      zipCode: Yup.string().required('Lütfen posta kodu giriniz.'),
      country: Yup.string().required().required('Lütfen ulke giriniz.')
    });
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    props.OnEdit &&
      props.OnEdit({
        AddressLine: values.addressLine,
        City: values.city,
        Country: values.country,
        County: values.county,
        ZipCode: values.zipCode
      } as OrganizationAddress);
    setSubmitting(false);
  }
})(InnerForm);

export { DeliveryAddressListItemForm };
