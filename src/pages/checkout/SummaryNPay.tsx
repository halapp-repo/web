import { Stack, Button, Typography, Checkbox } from '@mui/material';
import { useState } from 'react';

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
  const [approvedContract, setApprovedContract] = useState<boolean>(false);
  const handleChangeApproval = (e: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    setApprovedContract(checked);
    SetChangeApprovedContractField(checked);
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
          <Checkbox value={approvedContract} onChange={handleChangeApproval} />
          <Typography variant="body2" color="text.secondary">
            <Button
              size="small"
              color="blackNWhite"
              sx={{ textTransform: 'none', fontSize: 'inherit' }}
              onClick={() => {
                OnChangeDialogOpen(true);
              }}>
              Ön Bilgilendirme Koşulları{"'"}nı
            </Button>
            ve{' '}
            <Button
              size="small"
              color="blackNWhite"
              sx={{ textTransform: 'none', fontSize: 'inherit' }}
              onClick={() => {
                OnChangeDialogOpen(true);
              }}>
              Mesafeli Satış Sözleşmesi{"'"}ni
            </Button>
            okudum, onaylıyorum.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { SummaryNPay };
