import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { instanceToInstance } from 'class-transformer';
import { Field, Form, FormikProps, withFormik } from 'formik';
import { MuiTelInput } from 'mui-tel-input';
import * as Yup from 'yup';

import {
  AddressFieldWithPlaceFromQuery,
  AddressOutput
} from '../../../components/form/AddressFieldWithPlaceFromQuery';
import { AppTextField } from '../../../components/form/TextField';
import { Organization } from '../../../models/organization';

interface GeneralInformationFormProps {
  Organization: Organization;
  OnSubmit: (org: Organization) => Promise<void>;
  OnCancel: () => void;
}
interface FormValues {
  vkn: string;
  organizationName: string;

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

  email: string;
  phoneNumber: string;

  OnCancel: () => void;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, dirty, setFieldValue, setFieldTouched } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <Form
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}>
            <Stack spacing={2}>
              <Field
                name="organizationName"
                label="Şirket ismi"
                component={AppTextField}
                InputLabelProps={{ shrink: true }}
              />
              <Field
                disabled={true}
                name="vkn"
                label="Vergi kimlik no"
                component={AppTextField}
                InputLabelProps={{ shrink: true }}
              />
              <Divider textAlign="left">
                <Typography color="primary" variant="body2">
                  {'Fatura Adresi'}
                </Typography>
              </Divider>
              <Box>
                <Field
                  sx={{ width: '100%' }}
                  name="invoiceFormattedAddress"
                  label="Adres"
                  component={AddressFieldWithPlaceFromQuery}
                  onPlaceChanged={(e: (AddressOutput | null)[]) => {
                    if (e && e.length === 1) {
                      if (e[0]?.county) {
                        setFieldValue('invoiceCounty', e[0]?.county);
                        setTimeout(() => setFieldTouched('invoiceCounty', true), 500);
                      }
                      if (e[0]?.zipCode) {
                        setFieldValue('invoiceZipCode', e[0]?.zipCode);
                        setTimeout(() => setFieldValue('invoiceZipCode', e[0]?.zipCode), 500);
                      }
                      if (e[0]?.city) {
                        setFieldValue('invoiceCity', e[0]?.city);
                        setTimeout(() => setFieldTouched('invoiceCity', true), 500);
                      }
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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
              </Box>
              <Divider textAlign="left">
                <Typography color="primary" variant="body2">
                  {'İşletme adresi'}
                </Typography>
              </Divider>
              <Box>
                <Field
                  sx={{ width: '100%' }}
                  name="companyFormattedAddress"
                  label="Adres"
                  component={AddressFieldWithPlaceFromQuery}
                  onPlaceChanged={(e: (AddressOutput | null)[]) => {
                    if (e && e.length === 1) {
                      if (e[0]?.county) {
                        setFieldValue('companyCounty', e[0]?.county);
                        setTimeout(() => setFieldTouched('companyCounty', true), 500);
                      }
                      if (e[0]?.zipCode) {
                        setFieldValue('companyZipCode', e[0]?.zipCode);
                        setTimeout(() => setFieldValue('companyZipCode', e[0]?.zipCode), 500);
                      }
                      if (e[0]?.city) {
                        setFieldValue('companyCity', e[0]?.city);
                        setTimeout(() => setFieldTouched('companyCity', true), 500);
                      }
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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
              </Box>
              <Divider textAlign="left">
                <Typography color="primary" variant="body2">
                  {'İletişim bilgileri'}
                </Typography>
              </Divider>
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
              <Stack direction={'row'} justifyContent="space-between">
                <Button
                  type="submit"
                  variant="outlined"
                  color="blackNWhite"
                  onClick={props.values.OnCancel}>
                  {'İptal'}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !dirty || !isValid}
                  variant="contained">
                  {'Kaydet'}
                </Button>
              </Stack>
            </Stack>
          </Form>
        </Stack>
      </Grid>
    </Grid>
  );
};

const GeneralInformationForm = withFormik<GeneralInformationFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    const vkn = props.Organization.VKN!;
    const organizationName = props.Organization.Name!;
    const email = props.Organization.Email || '';
    const phoneNumber = props.Organization.PhoneNumber || '';
    return {
      vkn,
      organizationName,

      invoiceFormattedAddress: props.Organization.InvoiceAddress?.AddressLine || '',
      invoiceCounty: props.Organization.InvoiceAddress?.County || '',
      invoiceCity: props.Organization.InvoiceAddress?.City || '',
      invoiceZipCode: props.Organization.InvoiceAddress?.ZipCode || '',
      invoiceCountry: props.Organization.InvoiceAddress?.Country || '',

      companyFormattedAddress: props.Organization.CompanyAddress?.AddressLine || '',
      companyCounty: props.Organization.CompanyAddress?.County || '',
      companyCity: props.Organization.CompanyAddress?.City || '',
      companyZipCode: props.Organization.CompanyAddress?.ZipCode || '',
      companyCountry: props.Organization.CompanyAddress?.Country || '',

      email,
      phoneNumber,

      OnCancel: props.OnCancel
    };
  },
  validateOnMount: true,
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    organizationName: Yup.string()
      .min(2, 'min 2')
      .max(50, 'max 50')
      .required('Lütfen sirket ismi giriniz.'),
    vkn: Yup.string().required(),

    email: Yup.string()
      .email('Lütfen geçerli bir email adresi giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    phoneNumber: Yup.string().required('Lütfen telefonu giriniz.'),

    invoiceFormattedAddress: Yup.string().required('Lütfen adres giriniz.'),
    invoiceCounty: Yup.string().required().required('Lütfen ilce giriniz.'),
    invoiceCity: Yup.string().required('Lütfen sehir giriniz.'),
    invoiceZipCode: Yup.string().required('Lütfen posta kodu giriniz.'),
    invoiceCountry: Yup.string().required().required('Lütfen ulke giriniz.'),

    companyFormattedAddress: Yup.string().required('Lütfen adres giriniz.'),
    companyCounty: Yup.string().required().required('Lütfen ilce giriniz.'),
    companyCity: Yup.string().required('Lütfen sehir giriniz.'),
    companyZipCode: Yup.string().required('Lütfen posta kodu giriniz.'),
    companyCountry: Yup.string().required().required('Lütfen ülke giriniz.')
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    const cloneOrg = instanceToInstance(props.Organization);
    //
    cloneOrg.Name = values.organizationName;
    cloneOrg.Email = values.email;
    cloneOrg.PhoneNumber = values.phoneNumber;
    //
    cloneOrg.CompanyAddress!.AddressLine = values.companyFormattedAddress;
    cloneOrg.CompanyAddress!.County = values.companyCounty;
    cloneOrg.CompanyAddress!.City = values.companyCity;
    cloneOrg.CompanyAddress!.ZipCode = values.companyZipCode;
    //
    cloneOrg.InvoiceAddress!.AddressLine = values.invoiceFormattedAddress;
    cloneOrg.InvoiceAddress!.County = values.invoiceCounty;
    cloneOrg.InvoiceAddress!.City = values.invoiceCity;
    cloneOrg.InvoiceAddress!.ZipCode = values.invoiceZipCode;
    //
    await props.OnSubmit(cloneOrg);
    setSubmitting(false);
  }
})(InnerForm);

export default GeneralInformationForm;
