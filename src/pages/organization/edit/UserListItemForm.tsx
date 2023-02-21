import * as Yup from 'yup';
import { Grid, Stack, Button, Box, ListItem, ListItemText, Typography } from '@mui/material';
import { withFormik, FormikProps, Field, Form } from 'formik';
import { AppTextField } from '../../../components/form/TextField';

interface FormValues {
  email: string;
  OnCancel: () => void;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, values } = props;
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
                    <Typography variant="h6" color="secondary">
                      {'Yeni bir kullanıcı eklemek için lütfen e-mail adresi girin.'}
                    </Typography>
                    <Stack spacing={2}>
                      <Field
                        type="email"
                        name="email"
                        label="Email"
                        component={AppTextField}
                        sx={{ dispay: 'flex', width: '100%' }}
                      />
                    </Stack>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                      <Button color="blackNWhite" variant="outlined" onClick={values.OnCancel}>
                        {'Iptal'}
                      </Button>
                      <Button type="submit" disabled={isSubmitting || !isValid} variant="contained">
                        {'Bağlantıyı gönder'}
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

interface UserListItemFormProps {
  OnCancel: () => void;
  OnEdit: (email: string) => void;
}

const UserListItemForm = withFormik<UserListItemFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: '',
      OnCancel: props.OnCancel
    };
  },
  validateOnMount: true,
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.lazy(() => {
    return Yup.object().shape({
      email: Yup.string()
        .email('Lütfen geçerli bir email adresi giriniz.')
        .required('Lütfen email adresinizi giriniz.')
    });
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    props.OnEdit(values.email);
    setSubmitting(false);
  }
})(InnerForm);

export { UserListItemForm };
