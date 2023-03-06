import { Stack, Button } from '@mui/material';

interface SummaryNWithdrawProps {
  IsDisable: boolean;
}

const SummaryNWithdraw = ({ IsDisable }: SummaryNWithdrawProps) => {
  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
        <Button
          type="submit"
          variant="contained"
          disabled={IsDisable}
          sx={{ width: '100%', fontWeight: 'bold', textTransform: 'none' }}>
          {'Krediden Düş'}
        </Button>
        <Stack spacing={1} direction="row"></Stack>
      </Stack>
    </Stack>
  );
};

export { SummaryNWithdraw };
