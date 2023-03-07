import { Grid, Box, Tabs, Tab, useMediaQuery, Theme } from '@mui/material';
import { withFormik, FormikProps, Form, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import MainCard from '../../components/MainCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { TabPanel } from '../../components/form/TabPanel';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUICheckout, updateCheckout } from '../../store/ui/uiSlice';
import { OrderVM, PaymentMethodType } from '@halapp/common';
import { CardInformation } from './CardInformation';
import { SummaryNPay } from './SummaryNPay';
import { cardValidationSchema, withdrawValidationSchema } from './PaymentFormValidation';
import { Contracts } from './Contracts';
import { DialogContracts } from './DialogContracts';
import { WithdrawFromCredit } from './WithdrawFromCredit';
import { SummaryNWithdraw } from './SummaryNWithdraw';

interface FormValues {
  preOrder: OrderVM;
  //card
  step: PaymentMethodType;
  cardNumber: string;
  approvedContract: boolean;
  monthExpiry: string;
  yearExpiry: string;
  cvv: string;
  securePaymentEnabled: boolean;
  // withdraw
  hasEnoughCredit: boolean;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const dispatch = useAppDispatch();
  const { paymentMethod } = useAppSelector(selectUICheckout);
  const [activeStep, setActiveStep] = useState<PaymentMethodType>(paymentMethod);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { isSubmitting, isValid, setFieldValue, setFieldTouched, values } = props;

  const handleChangePaymentMethod = (event: React.SyntheticEvent, newValue: PaymentMethodType) => {
    setActiveStep(newValue);
  };
  const handleSetCardNumberField = async (cardNumber: string): Promise<void> => {
    setFieldValue('cardNumber', cardNumber.replace(/\s/g, ''));
    setTimeout(() => setFieldTouched('cardNumber', true), 100);
  };
  const handleSetApprovedContract = async (value: boolean): Promise<void> => {
    setFieldValue('approvedContract', value);
    setTimeout(() => setFieldTouched('approvedContract', true), 100);
  };
  const handleSetMonthExpiry = async (value: string): Promise<void> => {
    setFieldValue('monthExpiry', value);
    setTimeout(() => setFieldTouched('monthExpiry', true), 100);
  };
  const handleSetYearExpiry = async (value: string): Promise<void> => {
    setFieldValue('yearExpiry', value);
    setTimeout(() => setFieldTouched('yearExpiry', true), 100);
  };
  const handleSetCVV = async (value: string): Promise<void> => {
    setFieldValue('cvv', value);
    setTimeout(() => setFieldTouched('cvv', true), 100);
  };
  const handleSetSecurePaymentEnabled = async (value?: boolean): Promise<void> => {
    setFieldValue('securePaymentEnabled', value);
    setTimeout(() => setFieldTouched('securePaymentEnabled', true), 100);
  };
  const handleSetHasEnoughCredit = async (value: boolean): Promise<void> => {
    setFieldValue('hasEnoughCredit', value);
    setTimeout(() => setFieldTouched('hasEnoughCredit', true), 100);
  };
  useEffect(() => {
    setFieldValue('step', activeStep, true);
    setTimeout(() => setFieldTouched('step', true), 100);
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
                value={PaymentMethodType.card}
                label="Kart ile öde"
                icon={!matchesSm ? <CreditCardIcon /> : <></>}
                iconPosition="start"
              />
              <Tab
                sx={{ textTransform: 'none' }}
                value={PaymentMethodType.credit}
                label="Bakiyeden düş"
                icon={!matchesSm ? <AccountBalanceIcon /> : <></>}
                iconPosition="start"
              />
            </Tabs>
            <TabPanel value={activeStep} index={PaymentMethodType.card}>
              <Box sx={{ p: 1 }}>
                <CardInformation
                  SetCardNumberField={handleSetCardNumberField}
                  SetMonthField={handleSetMonthExpiry}
                  SetYearField={handleSetYearExpiry}
                  SetCVVField={handleSetCVV}
                  SetSecurePaymentEnabledField={handleSetSecurePaymentEnabled}
                />
              </Box>
            </TabPanel>
            <TabPanel value={activeStep} index={PaymentMethodType.credit}>
              <Box sx={{ p: 1 }}>
                <WithdrawFromCredit
                  OrganizationId={values.preOrder.OrganizationId}
                  SetHasEnoughCredit={handleSetHasEnoughCredit}
                />
              </Box>
            </TabPanel>
          </MainCard>
          {activeStep === PaymentMethodType.card && (
            <MainCard sx={{ mt: 2, p: 2 }}>
              <Contracts />
            </MainCard>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            {activeStep === PaymentMethodType.card && (
              <SummaryNPay
                PaymentMethodType={activeStep}
                IsDisable={isSubmitting || !isValid}
                SetChangeApprovedContractField={handleSetApprovedContract}
                OnChangeDialogOpen={(isOpen: boolean) => setDialogOpen(isOpen)}
              />
            )}
            {activeStep === PaymentMethodType.credit && (
              <SummaryNWithdraw
                PaymentMethodType={activeStep}
                IsDisable={isSubmitting || !isValid}
              />
            )}
          </MainCard>
        </Grid>
      </Grid>
      <DialogContracts
        IsDialogOpen={isDialogOpen}
        OnChangeDialogOpen={(isOpen: boolean) => setDialogOpen(isOpen)}
      />
    </Form>
  );
};

interface MyFormProps {
  onSubmit: () => void;
  PreOrder: OrderVM;
}
const PaymentForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      preOrder: props.PreOrder,
      step: PaymentMethodType.card,
      cardNumber: '',
      approvedContract: false,
      monthExpiry: '',
      yearExpiry: '',
      cvv: '',
      securePaymentEnabled: false,
      hasEnoughCredit: false
    };
  },
  // Transform outer props into form values
  // Add a custom validation function (this can be async too!)
  validate: async (values) => {
    let schema;
    if (values.step === PaymentMethodType.card) {
      schema = cardValidationSchema;
    } else {
      schema = withdrawValidationSchema;
    }

    try {
      await schema.validate(values, { abortEarly: true, strict: false });
      return Promise.resolve({});
    } catch (yupErr) {
      if (yupErr instanceof Yup.ValidationError) {
        return yupToFormErrors(yupErr);
      }
    }
  },
  validateOnMount: true,
  handleSubmit: async (values, { setSubmitting }) => {
    // do submitting things
    setSubmitting(false);
  }
})(InnerForm);

export { PaymentForm };
