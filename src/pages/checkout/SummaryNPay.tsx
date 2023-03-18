import { ExtraCharge, PaymentMethodType } from '@halapp/common';
import { Stack, Button, Typography, Checkbox, Divider } from '@mui/material';
import { useEffect, useContext } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUICheckout, updateCheckout } from '../../store/ui/uiSlice';
import { ShoppingCartContext } from './ShoppingCartContext';
import { SummaryOrder } from './SummaryOrder';
import { SummaryPayment } from './SummaryPayment';
import { SummaryTotalPrice } from './SummaryTotalPrice';

interface SummaryNPayProps {
  SetChangeApprovedContractField: (value: boolean) => Promise<void>;
  OnChangeDialogOpen: (isOpen: boolean) => void;
  PaymentMethodType: PaymentMethodType;
  IsDisable: boolean;
  ExtraCharges?: ExtraCharge[];
}

const SummaryNPay = ({
  SetChangeApprovedContractField,
  OnChangeDialogOpen,
  PaymentMethodType: PMT,
  IsDisable,
  ExtraCharges
}: SummaryNPayProps) => {
  const dispatch = useAppDispatch();
  const shoppingCart = useContext(ShoppingCartContext);
  const { approvedContract } = useAppSelector(selectUICheckout);

  useEffect(() => {
    SetChangeApprovedContractField(false);
  }, []);

  useEffect(() => {
    SetChangeApprovedContractField(approvedContract);
  }, [approvedContract]);

  const handleChangeApproval = (e: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    dispatch(
      updateCheckout({
        approvedContract: checked
      })
    );
  };

  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
        <Button
          type="submit"
          variant="contained"
          disabled={IsDisable || PMT !== PaymentMethodType.balance}
          sx={{ width: '100%', fontWeight: 'bold', textTransform: 'none' }}>
          {'Ödeme Yap'}
        </Button>
        <Stack spacing={1} direction="row">
          <Checkbox checked={approvedContract} onChange={handleChangeApproval} />
          <Typography variant="body2" color="text.secondary">
            <u
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                OnChangeDialogOpen(true);
              }}>
              <b>Ön Bilgilendirme Koşulları</b>
            </u>
            &apos;nı ve&nbsp;
            <u
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                OnChangeDialogOpen(true);
              }}>
              <b>Mesafeli Satış Sözleşmesi</b>
            </u>
            &apos;ni okudum, onaylıyorum.
          </Typography>
        </Stack>
        <Divider />
        <SummaryOrder ShoppingCart={shoppingCart} />
        <Divider />
        <SummaryPayment PaymentMethodType={PMT} ExtraCharges={ExtraCharges} />
        <Divider />
        <SummaryTotalPrice ShoppingCart={shoppingCart} ExtraCharges={ExtraCharges} />
      </Stack>
    </Stack>
  );
};

export { SummaryNPay };
