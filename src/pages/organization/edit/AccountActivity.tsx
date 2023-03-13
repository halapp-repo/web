import { AccountEventType } from '@halapp/common';
import { Stack, Box, Typography, List, ListItem, CircularProgress, Divider } from '@mui/material';
import { useEffect } from 'react';
import { RetryOnError } from '../../../components/RetryOnError';
import { AccountEvent } from '../../../models/events/account-event';
import { Organization } from '../../../models/organization';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  fetchIndividualOrganizationWithEvents,
  selectOrganizationEvents,
  selectOrganizationEventsIsLoading
} from '../../../store/organizations/organizationsSlice';
import { getComparator } from '../../../utils/sort';
import { ActivityListItem } from './ActivityListItem';
import { useTheme } from '@mui/system';

interface AccountActivityProps {
  Organization: Organization;
}

const AccountActivity = ({ Organization }: AccountActivityProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => selectOrganizationEvents(state, Organization.ID));
  const isLoading = useAppSelector(selectOrganizationEventsIsLoading);
  useEffect(() => {
    if (!events) {
      dispatch(fetchIndividualOrganizationWithEvents(Organization.ID!));
    }
  }, []);
  const handleRetry = () => {
    dispatch(fetchIndividualOrganizationWithEvents(Organization.ID!));
  };
  const getContent = (events: AccountEvent[] | null | undefined, isLoading: boolean) => {
    if (isLoading) {
      return (
        <ListItem sx={{ justifyContent: 'center' }}>
          <CircularProgress />
        </ListItem>
      );
    } else if (events === null) {
      return (
        <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
          <RetryOnError HandleRetry={handleRetry} />
        </ListItem>
      );
    } else {
      return events
        ?.filter((e) => {
          return (
            e.EventType === AccountEventType.OrganizationWithdrewFromBalanceV1 ||
            e.EventType === AccountEventType.OrganizationCreatedV1 ||
            e.EventType === AccountEventType.OrganizationDepositedToBalanceV1 ||
            e.EventType === AccountEventType.OrganizationPaidWithCardV1
          );
        })
        .sort(getComparator('desc', 'TS'))
        .map((e, i, arr) => (
          <>
            <ListItem key={e.TS.format()}>
              <ActivityListItem Event={e} />
            </ListItem>
            {i !== arr.length - 1 && <Divider />}
          </>
        ));
    }
  };
  return (
    <Box>
      <List
        subheader={
          <Stack spacing={1}>
            <Stack>
              <Typography variant="body2" fontWeight={'bold'} color="text.secondary">
                {'Bakiye'}
              </Typography>
              <Typography
                variant="h2"
                color={
                  Organization.Balance >= 0 ? theme.palette.success.main : theme.palette.error.main
                }>
                {Organization.getBalanceAmount()}
              </Typography>
            </Stack>
            <Divider />
          </Stack>
        }>
        {getContent(events, isLoading)}
      </List>
    </Box>
  );
};

export { AccountActivity };
