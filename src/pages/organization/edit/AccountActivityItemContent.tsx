import { ReactNode } from 'react';
import { Typography, Grid, Stack } from '@mui/material';
import { trMoment } from '../../../utils/timezone';
import { AccountEvent } from '../../../models/events/account-event';
import { AccountEventType, OrganizationWithdrewV1PayloadVM } from '@halapp/common';

interface AccountActivityItemContentProps {
  children?: ReactNode;
  Event: AccountEvent;
  sx?: object;
}

const AccountActivityItemContent = ({ children, Event, sx }: AccountActivityItemContentProps) => {
  const hourDuration = trMoment().diff(Event.TS, 'hours');
  let amount: number | undefined;
  let balance = 0;
  if (Event.EventType === AccountEventType.OrganizationWithdrewV1) {
    const { CurrentBalance, WithdrawAmount } = Event.Payload as OrganizationWithdrewV1PayloadVM;
    amount = WithdrawAmount * -1;
    balance = CurrentBalance;
  }
  return (
    <Grid container spacing={1} sx={{ ...sx, minHeight: '100px' }}>
      <Grid item xs={7} md={9}>
        <Stack spacing={1}>
          <Typography variant="body2" fontWeight="bold" color="secondary">
            {hourDuration > 24 ? Event.TS.format('MMM DD,YYYY') : Event.TS.fromNow()}
          </Typography>
          {children}
        </Stack>
      </Grid>
      <Grid item xs={5} md={3}>
        <Stack spacing={1}>
          {typeof amount !== 'undefined' && (
            <Stack>
              <Typography variant="body2" fontWeight="bold" color="secondary">
                {'Tutar'}
              </Typography>
              <Typography
                variant="h5"
                color={amount === 0 ? 'info.main' : amount > 0 ? 'success.main' : 'error.main'}>
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                  amount
                )}
              </Typography>
            </Stack>
          )}
          <Stack>
            <Typography variant="body2" fontWeight="bold" color="secondary">
              {'Bakiye'}
            </Typography>
            <Typography variant="h5">
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                balance
              )}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export { AccountActivityItemContent };
