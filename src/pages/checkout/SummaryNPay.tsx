import { Stack, Button, Typography, Checkbox } from '@mui/material';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUICheckout, updateCheckout } from '../../store/ui/uiSlice';

interface SummaryNPayProps {
  IsDisable: boolean;
  SetChangeApprovedContractField: (value: boolean) => Promise<void>;
  OnChangeDialogOpen: (isOpen: boolean) => void;
}

const SummaryNPay = ({
  IsDisable,
  SetChangeApprovedContractField,
  OnChangeDialogOpen
}: SummaryNPayProps) => {
  const dispatch = useAppDispatch();
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
          disabled={IsDisable}
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
            {"'"}nı ve{' '}
            <u
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                OnChangeDialogOpen(true);
              }}>
              <b>Mesafeli Satış Sözleşmesi</b>
            </u>
            {"'"}ni okudum, onaylıyorum.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { SummaryNPay };
