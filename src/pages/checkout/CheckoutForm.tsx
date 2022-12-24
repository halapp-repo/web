import { Grid } from '@mui/material';
import { withFormik, FormikProps, Form } from 'formik';
import * as Yup from 'yup';
import MainCard from '../../components/MainCard';
import { OrderItemDTO } from '../../models/dtos/order-item.dto';
import { OrganizationAddress } from '../../models/organization';
import { AddressSelector } from './AddressSelector';
import { OrderNote } from './OrderNote';
import { SummaryNPlaceOrder } from './SummaryNPlaceOrder';

interface FormValues {
  orderNote: string;
  organizationId: string;
  deliveryAddress?: OrganizationAddress;
  orderItems: OrderItemDTO[];
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { isSubmitting, isValid, setFieldValue } = props;

  const handleSetAddress = async (
    orgId: string,
    deliveryAddress: OrganizationAddress
  ): Promise<void> => {
    setFieldValue('organizationId', orgId, true);
    setFieldValue('deliveryAddress', deliveryAddress, true);
  };
  const handleSetNote = async (note: string): Promise<void> => {
    setFieldValue('orderNote', note, true);
  };
  const handleSetOrderItems = async (orderItems: OrderItemDTO[]) => {
    setFieldValue('orderItems', orderItems, true);
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
              <OrderNote SetNote={handleSetNote} />
            </MainCard>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <MainCard sx={{ mt: 2, p: 2 }}>
            <SummaryNPlaceOrder
              IsValid={isSubmitting || !isValid}
              SetOrderItems={handleSetOrderItems}
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
    orderItems: OrderItemDTO[]
  ) => Promise<void>;
}

const CheckoutForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      orderNote: '',
      organizationId: '',
      deliveryAddress: undefined,
      orderItems: []
    };
  },
  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    orderNote: Yup.string().optional(),
    organizationId: Yup.string().required(),
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
      values.orderItems
    );
    setSubmitting(false);
  }
})(InnerForm);

export { CheckoutForm };
