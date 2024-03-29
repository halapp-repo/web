import { OrderItemVM } from '@halapp/common';
import { Grid } from '@mui/material';
import { Form, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import MainCard from '../../components/MainCard';
import { OrganizationAddress } from '../../models/organization';
import { AddressSelector } from './AddressSelector';
import { DeliveryTime } from './DeliveryTime';
import { OrderNote } from './OrderNote';
import { SummaryNContinue } from './SummaryNContinue';

interface FormValues {
  orderNote: string;
  organizationId: string;
  deliveryAddress?: OrganizationAddress;
  orderItems: OrderItemVM[];
  deliveryTime: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, setFieldValue, setFieldTouched, values } = props;

  const handleSetAddress = async (
    orgId: string,
    deliveryAddress: OrganizationAddress
  ): Promise<void> => {
    setFieldValue('organizationId', orgId, true);
    setTimeout(() => setFieldTouched('organizationId', true), 100);
    setFieldValue('deliveryAddress', deliveryAddress, true);
    setTimeout(() => setFieldTouched('deliveryAddress', true), 100);
  };
  const handleSetNoteField = async (note: string): Promise<void> => {
    setFieldValue('orderNote', note);
    setTimeout(() => setFieldTouched('orderNote', true), 100);
  };
  const handleSetOrderItems = async (orderItems: OrderItemVM[]) => {
    setFieldValue('orderItems', orderItems, true);
    setTimeout(() => setFieldTouched('orderItems', true), 100);
  };
  const handleSetDeliveryTime = async (deliveryTime: string) => {
    setFieldValue('deliveryTime', deliveryTime);
    setTimeout(() => setFieldTouched('deliveryTime', true), 100);
  };

  return (
    <Form
      onKeyPress={(e) => {
        e.which === 13 && e.preventDefault();
      }}>
      <Grid container rowSpacing={4.5} justifyContent="left" columnSpacing={2.75} alignItems="left">
        <Grid item xs={12} sm={12} md={6}>
          <Grid item xs={12}>
            <MainCard sx={{ mt: 2, p: 2 }}>
              <AddressSelector SetAddress={handleSetAddress} />
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard sx={{ mt: 2, p: 2 }}>
              <DeliveryTime SetDeliveryTime={handleSetDeliveryTime} />
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard sx={{ mt: 2, p: 2 }}>
              <OrderNote SetNoteField={handleSetNoteField} />
            </MainCard>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <SummaryNContinue
              IsValid={isSubmitting || !isValid}
              SetOrderItems={handleSetOrderItems}
              DeliveryTime={values.deliveryTime}
            />
          </MainCard>
        </Grid>
      </Grid>
    </Form>
  );
};

interface MyFormProps {
  onSubmit: (
    orderNote: string,
    organizationId: string,
    deliveryAddress: OrganizationAddress,
    orderItems: OrderItemVM[],
    deliveryTime: string
  ) => Promise<void>;
}

const CheckoutForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      orderNote: '',
      organizationId: '',
      deliveryAddress: undefined,
      orderItems: [],
      deliveryTime: ''
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    orderNote: Yup.string().optional(),
    organizationId: Yup.string().required(),
    deliveryTime: Yup.string().required(),
    deliveryAddress: Yup.object().shape({
      Active: Yup.boolean().optional(),
      AddressLine: Yup.string().required(),
      County: Yup.string().required(),
      City: Yup.string().required(),
      ZipCode: Yup.string().required(),
      Country: Yup.string().required()
    }),
    orderItems: Yup.array()
      .of(
        Yup.object().shape({
          ProductId: Yup.string(),
          Price: Yup.number(),
          Count: Yup.number(),
          Unit: Yup.string()
        })
      )
      .min(1)
      .required()
  }),
  validateOnMount: true,
  handleSubmit: async (values, { props, setSubmitting }) => {
    // do submitting things
    await props.onSubmit(
      values.orderNote,
      values.organizationId,
      values.deliveryAddress!,
      values.orderItems,
      values.deliveryTime
    );
    setSubmitting(false);
  }
})(InnerForm);

export { CheckoutForm };
