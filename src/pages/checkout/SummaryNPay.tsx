import { Stack, Box, Button, Typography, Checkbox } from '@mui/material';

interface SummaryNPayProps {
  IsDisable: boolean;
}

const SummaryNPay = ({ IsDisable }: SummaryNPayProps) => {
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
          <Checkbox />
          <Typography variant="body2" color="text.secondary">
            Ön Bilgilendirme Koşulları{"'"}nı ve Mesafeli Satış Sözleşmesi{"'"}ni okudum,
            onaylıyorum.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { SummaryNPay };
