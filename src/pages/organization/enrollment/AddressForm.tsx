import {
  Typography,
  Grid,
  Stack,
  Box,
  Button,
  Divider,
  Switch,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import { useState } from 'react';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AppTextField } from '../../../components/form/TextField';
import { Organization } from '../../../models/organization';

interface FormValues {
  areSame: boolean;

  invoiceFormattedAddress: string;
  invoiceCounty: string;
  invoiceCity: string;
  invoiceZipCode: string;
  invoiceCountry: string;

  companyFormattedAddress: string;
  companyCounty: string;
  companyCity: string;
  companyZipCode: string;
  companyCountry: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, setFieldValue, values, setFieldTouched, getFieldProps } = props;
  const [areSame, setAreSame] = useState(values.areSame);
  const handleAddressBlur = (e: React.FocusEvent, field: string) => {
    const onBlurDefault = getFieldProps(field);
    if (!onBlurDefault) {
      return;
    }
    onBlurDefault.onBlur(e);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Typography variant="h4" color="text.primary" fontWeight="bold">
            {`Adres bilgileri`}
          </Typography>
          <Form
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}>
            <Stack spacing={2}>
              <Box>
                <Stack spacing={2}>
                  <Typography variant="h5" color="text.primary" fontWeight="bold">
                    {`Fatura adresi`}
                  </Typography>
                  <Field
                    name="invoiceFormattedAddress"
                    label="Fatura adresi"
                    component={AppTextField}
                    // InputProps={{
                    //   onBlur: (e: React.FocusEvent) =>
                    //     handleAddressBlur(e, 'invoiceFormattedAddress')
                    // }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Field
                      name="invoiceCounty"
                      label="ilçe"
                      component={AppTextField}
                      InputLabelProps={{ shrink: true }}
                    />
                    <Field
                      name="invoiceCity"
                      label="il"
                      component={AppTextField}
                      InputLabelProps={{ shrink: true }}
                    />
                    <Field
                      name="invoiceZipCode"
                      label="Posta Kodu"
                      component={AppTextField}
                      InputLabelProps={{ shrink: true }}
                    />
                    <Field type="hidden" name="invoiceCountry" />
                  </Box>
                </Stack>
              </Box>
              <Divider textAlign="left">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={areSame}
                        onChange={(e, v) => {
                          setAreSame(v);
                          setFieldValue('areSame', v);
                        }}
                      />
                    }
                    label="İşletme ve Fatura adresin aynı mı?"
                  />
                </FormGroup>
              </Divider>
              {!areSame && (
                <Box>
                  <Stack spacing={2}>
                    <Typography variant="h5" color="text.primary" fontWeight="bold">
                      {`İşletme adresi`}
                    </Typography>
                    <Field
                      name="companyFormattedAddress"
                      label="İşletme adresi"
                      component={AppTextField}
                      InputLabelProps={{ shrink: true }}
                      // InputProps={{
                      //   onBlur: (e: React.FocusEvent) =>
                      //     handleAddressBlur(e, 'companyFormattedAddress')
                      // }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Field
                        name="companyCounty"
                        label="ilçe"
                        component={AppTextField}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Field
                        name="companyCity"
                        label="il"
                        component={AppTextField}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Field
                        name="companyZipCode"
                        label="Posta Kodu"
                        component={AppTextField}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Field type="hidden" name="companyCountry" />
                    </Box>
                  </Stack>
                </Box>
              )}
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
  onSubmit: (props: {
    invoiceFormattedAddress: string;
    invoiceCounty: string;
    invoiceCity: string;
    invoiceZipCode: string;
    invoiceCountry: string;
    companyFormattedAddress: string;
    companyCounty: string;
    companyCity: string;
    companyZipCode: string;
    companyCountry: string;
  }) => void;
}

const AddressForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      areSame: true,

      invoiceFormattedAddress: props.organization.InvoiceAddress?.AddressLine || '',
      invoiceCounty: props.organization.InvoiceAddress?.County || '',
      invoiceCity: props.organization.InvoiceAddress?.City || '',
      invoiceZipCode: props.organization.InvoiceAddress?.ZipCode || '',
      invoiceCountry: 'Türkiye',

      companyFormattedAddress: props.organization.CompanyAddress?.AddressLine || '',
      companyCounty: props.organization.CompanyAddress?.County || '',
      companyCity: props.organization.CompanyAddress?.City || '',
      companyZipCode: props.organization.CompanyAddress?.ZipCode || '',
      companyCountry: 'Türkiye'
    };
  },
  validateOnMount: true,
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.lazy((values) => {
    return Yup.object().shape({
      invoiceFormattedAddress: Yup.string().required('Lütfen adres giriniz.'),
      invoiceCounty: Yup.string().required().required('Lütfen ilce giriniz.'),
      invoiceCity: Yup.string().required('Lütfen sehir giriniz.'),
      invoiceZipCode: Yup.string().required('Lütfen posta kodu giriniz.'),
      invoiceCountry: Yup.string().required().required('Lütfen ulke giriniz.'),

      companyFormattedAddress: values.areSame
        ? Yup.string().notRequired()
        : Yup.string().required('Lütfen adres giriniz.'),
      companyCounty: values.areSame
        ? Yup.string().notRequired()
        : Yup.string().required().required('Lütfen ilce giriniz.'),
      companyCity: values.areSame
        ? Yup.string().notRequired()
        : Yup.string().required('Lütfen sehir giriniz.'),
      companyZipCode: values.areSame
        ? Yup.string().notRequired()
        : Yup.string().required('Lütfen posta kodu giriniz.'),
      companyCountry: values.areSame
        ? Yup.string().notRequired()
        : Yup.string().required().required('Lütfen ülke giriniz.')
    });
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things

    props.onSubmit({
      invoiceFormattedAddress: values.invoiceFormattedAddress,
      invoiceCity: values.invoiceCity,
      invoiceCounty: values.invoiceCounty,
      invoiceCountry: values.invoiceCountry,
      invoiceZipCode: values.invoiceZipCode,
      companyFormattedAddress: values.areSame
        ? values.invoiceFormattedAddress
        : values.companyFormattedAddress,
      companyCity: values.areSame ? values.invoiceCity : values.companyCity,
      companyCounty: values.areSame ? values.invoiceCounty : values.companyCounty,
      companyCountry: values.areSame ? values.invoiceCountry : values.companyCountry,
      companyZipCode: values.areSame ? values.invoiceZipCode : values.companyZipCode
    });
    setSubmitting(false);
  }
})(InnerForm);

export { AddressForm };
