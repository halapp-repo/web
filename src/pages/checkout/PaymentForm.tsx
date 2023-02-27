import { Grid, Box, Tabs, Tab, useMediaQuery, Theme } from '@mui/material';
import { withFormik, FormikProps, Form } from 'formik';
import * as Yup from 'yup';
import MainCard from '../../components/MainCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { TabPanel } from '../../components/form/TabPanel';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUICheckout, updateCheckout } from '../../store/ui/uiSlice';
import { PaymentType } from '@halapp/common';
import { CardInformation } from './CardInformation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormValues {}

const InnerForm = (props: FormikProps<FormValues>) => {
  const dispatch = useAppDispatch();
  const { paymentMethod } = useAppSelector(selectUICheckout);
  const [activeStep, setActiveStep] = useState<PaymentType>(paymentMethod);
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { isSubmitting, isValid, setFieldValue, setFieldTouched, values } = props;

  const handleChangePaymentMethod = (event: React.SyntheticEvent, newValue: PaymentType) => {
    setActiveStep(newValue);
  };
  useEffect(() => {
    return () => {
      dispatch(
        updateCheckout({
          paymentMethod: activeStep
        })
      );
    };
  }, [activeStep]);
  return (
    <Form
      onKeyPress={(e) => {
        e.which === 13 && e.preventDefault();
      }}>
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} sm={12} md={6}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <Tabs
              value={activeStep}
              onChange={handleChangePaymentMethod}
              sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tab
                sx={{ textTransform: 'none' }}
                value={PaymentType.card}
                label="Kart ile öde"
                icon={!matchesSm ? <CreditCardIcon /> : <></>}
                iconPosition="start"
              />
              <Tab
                sx={{ textTransform: 'none' }}
                value={PaymentType.balance}
                label="Bakiyeden düş"
                icon={!matchesSm ? <AccountBalanceIcon /> : <></>}
                iconPosition="start"
              />
            </Tabs>
            <TabPanel value={activeStep} index={PaymentType.card}>
              <Box sx={{ p: 1 }}>
                <CardInformation />
              </Box>
            </TabPanel>
            <TabPanel value={0} index={PaymentType.balance}>
              <div>uuu</div>
            </TabPanel>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <Box></Box>
          </MainCard>
        </Grid>
      </Grid>
    </Form>
  );
};

interface MyFormProps {
  onSubmit: () => void;
}
const PaymentForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({}),
  validateOnMount: false,
  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    setSubmitting(false);
  }
})(InnerForm);

export { PaymentForm };
