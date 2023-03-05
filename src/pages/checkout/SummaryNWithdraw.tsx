import { Stack, Button, Typography, Checkbox } from '@mui/material';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUICheckout, updateCheckout } from '../../store/ui/uiSlice';

interface SummaryNWithdrawProps {
  IsDisable: boolean;
}

const SummaryNWithdraw = ({ IsDisable }: SummaryNWithdrawProps) => {
  const dispatch = useAppDispatch();
  const { approvedContract } = useAppSelector(selectUICheckout);

  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
        <Button
          type="submit"
          variant="contained"
          disabled={IsDisable}
          sx={{ width: '100%', fontWeight: 'bold', textTransform: 'none' }}>
          {'Bakiyeden Düş'}
        </Button>
        <Stack spacing={1} direction="row"></Stack>
      </Stack>
    </Stack>
  );
};

export { SummaryNWithdraw };
