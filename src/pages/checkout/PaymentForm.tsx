import { Grid, Box, Tabs, useMediaQuery, Theme } from '@mui/material';
import { withFormik, FormikProps, Form, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import MainCard from '../../components/MainCard';
import { TabPanel } from '../../components/form/TabPanel';
import { useState, useEffect, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUICheckout, updateCheckout } from '../../store/ui/uiSlice';
import { ExtraChargeService, OrderVM, PaymentMethodType } from '@halapp/common';
import { CardInformation } from './CardInformation';
import { SummaryNPay } from './SummaryNPay';
import { cardValidationSchema, withdrawValidationSchema } from './PaymentFormValidation';
import { Contracts } from './Contracts';
import { DialogContracts } from './DialogContracts';
import { WithdrawFromCredit } from './WithdrawFromCredit';
import { Tab } from '../../components/form/Tab';
import { CreditCardOutlined, CreditCardFilled } from '@ant-design/icons';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { ShoppingCartContext } from './ShoppingCartContext';
import { OrganizationsContext } from './OrganizationsContext';

interface FormValues {
  preOrder: OrderVM;
  step: PaymentMethodType;
  //card
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
  const shoppingCart = useContext(ShoppingCartContext);
  const organizations = useContext(OrganizationsContext);
  const selectedOrganization = organizations?.find((o) => o.ID === values.preOrder.OrganizationId);

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
  const extraCharges = new ExtraChargeService().getExtraCharges({
    orderPrice: shoppingCart.Total,
    balance: activeStep === PaymentMethodType.balance ? selectedOrganization?.Balance : undefined
  });
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
                icon={
                  activeStep === PaymentMethodType.card ? (
                    <CreditCardFilled style={{ fontSize: '24px' }} />
                  ) : (
                    <CreditCardOutlined style={{ fontSize: '24px' }} />
                  )
                }
                iconPosition={!matchesSm ? 'start' : 'top'}
              />
              <Tab
                sx={{ textTransform: 'none' }}
                value={PaymentMethodType.balance}
                label="Bakiyeden düş"
                icon={
                  activeStep === PaymentMethodType.balance ? (
                    <AccountBalanceIcon style={{ fontSize: '24px' }} />
                  ) : (
                    <AccountBalanceOutlinedIcon style={{ fontSize: '24px' }} />
                  )
                }
                iconPosition={!matchesSm ? 'start' : 'top'}
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
            <TabPanel value={activeStep} index={PaymentMethodType.balance}>
              <Box sx={{ p: 1 }}>
                <WithdrawFromCredit
                  Organization={selectedOrganization!}
                  SetHasEnoughCredit={handleSetHasEnoughCredit}
                />
              </Box>
            </TabPanel>
          </MainCard>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <Contracts Organization={selectedOrganization!} ExtraCharges={extraCharges} />
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <SummaryNPay
              PaymentMethodType={activeStep}
              IsDisable={isSubmitting || !isValid}
              SetChangeApprovedContractField={handleSetApprovedContract}
              OnChangeDialogOpen={(isOpen: boolean) => setDialogOpen(isOpen)}
              ExtraCharges={extraCharges}
            />
          </MainCard>
        </Grid>
      </Grid>
      <DialogContracts
        Organization={selectedOrganization!}
        ExtraCharges={extraCharges}
        IsDialogOpen={isDialogOpen}
        OnChangeDialogOpen={(isOpen: boolean) => setDialogOpen(isOpen)}
      />
    </Form>
  );
};

interface MyFormProps {
  onSubmit: (prevStepOrder: OrderVM, paymentMethodType: PaymentMethodType) => Promise<void>;
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
  handleSubmit: async (values, { props, setSubmitting }) => {
    props.onSubmit(props.PreOrder, values.step).then(() => setSubmitting(false));
  }
})(InnerForm);

export { PaymentForm };
