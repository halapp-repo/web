import 'yup-phone';

import { Button, Grid, Stack } from '@mui/material';
import { Field, Form, FormikProps, withFormik } from 'formik';
import { MuiTelInput } from 'mui-tel-input';
import * as Yup from 'yup';

import { AppTextField } from '../../components/form/TextField';
import { User } from '../../models/user';

interface FormValues {
  fname?: string;
  lname?: string;
  phone?: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, dirty, isValid, values, setFieldValue } = props;
  return (
    <Stack spacing={1}>
      <Form
        onKeyPress={(e) => {
          e.which === 13 && e.preventDefault();
        }}>
        <Grid container justifyContent={'center'}>
          <Grid item xs={10} md={8}>
            <Stack spacing={2}>
              <Field name="fname" label="İsim" component={AppTextField} />
              <Field name="lname" label="Soyisim" component={AppTextField} />
              <Field
                defaultCountry="TR"
                label="Telefon numarasi"
                name="phone"
                value={values.phone}
                component={MuiTelInput}
                onChange={(value: string) => setFieldValue('phone', value)}
              />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                variant="contained">
                {'Kaydet'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </Stack>
  );
};

interface MyFormProps {
  User: User;
  onSubmit: ({
    firstName,
    lastName,
    phoneNumber
  }: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => Promise<void>;
}

const ProfileForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props: MyFormProps) => {
    return {
      fname: props.User.FirstName,
      lname: props.User.LastName,
      phone: props.User.PhoneNumber
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    fname: Yup.string().required('Lütfen Isim giriniz.'),
    lname: Yup.string().required('Lütfen Soyisim giriniz.'),
    phone: Yup.string()
      .transform((value) => {
        if (!value) {
          return value;
        }
        const temp = value.replace(/\s/g, '');
        return temp;
      })
      .phone('Lütfen gecerli bir telefon giriniz')
      .required('Lütfen telefon giriniz.')
  }),

  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // do submitting things
    await props.onSubmit({
      firstName: values.fname || '',
      lastName: values.lname || '',
      phoneNumber: values.phone || ''
    });
    setSubmitting(false);
    resetForm({ values });
  }
})(InnerForm);

export { ProfileForm };
