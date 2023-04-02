import { AccountEventType } from '@halapp/common';
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Pagination,
  Stack,
  Theme,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';

import { RetryOnError } from '../../../components/RetryOnError';
import { AccountEvent } from '../../../models/events/account-event';
import { Organization } from '../../../models/organization';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchIndividualOrganizationWithEvents,
  selectOrganizationEvents,
  selectOrganizationEventsIsLoading
} from '../../../store/organizations/organizationsSlice';
import {
  selectUIOrganization,
  updateOrganization as updateUIOrganization
} from '../../../store/ui/uiSlice';
import { paginate } from '../../../utils/pagination';
import { getComparator } from '../../../utils/sort';
import { ActivityListItem } from './ActivityListItem';

interface AccountActivityProps {
  Organization: Organization;
}

const AccountActivity = ({ Organization }: AccountActivityProps) => {
  const theme = useTheme();
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const { page: pageUI, paginationCount } = useAppSelector(selectUIOrganization);
  const events = useAppSelector((state) => selectOrganizationEvents(state, Organization.ID));
  const isLoading = useAppSelector(selectOrganizationEventsIsLoading);
  const [page, setPage] = useState<number>(pageUI);

  useEffect(() => {
    if (!events) {
      dispatch(fetchIndividualOrganizationWithEvents(Organization.ID!));
    }
    return () => {
      dispatch(
        updateUIOrganization({
          page: page
        })
      );
    };
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
      return paginate(
        (events || [])
          .filter((e) => {
            return (
              e.EventType === AccountEventType.OrganizationWithdrewFromBalanceV1 ||
              e.EventType === AccountEventType.OrganizationCreatedV1 ||
              e.EventType === AccountEventType.OrganizationDepositedToBalanceV1 ||
              e.EventType === AccountEventType.OrganizationPaidWithCardV1
            );
          })
          .sort(getComparator('desc', 'TS'))
          .map((e, i, arr) => (
            <Fragment key={i}>
              <ListItem key={e.TS.format()}>
                <ActivityListItem Event={e} />
              </ListItem>
              {i !== arr.length - 1 && <Divider />}
            </Fragment>
          )),
        paginationCount,
        page
      );
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
      {events && events.length > paginationCount && (
        <Pagination
          variant="outlined"
          color="primary"
          shape="rounded"
          onChange={(e, p) => setPage(p)}
          size={matchesSm ? 'small' : 'medium'}
          sx={{ justifyContent: 'center', display: 'flex' }}
          count={Math.ceil(events.length / paginationCount)}
        />
      )}
    </Box>
  );
};

export { AccountActivity };
