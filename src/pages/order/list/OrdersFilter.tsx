import React from 'react';
import { useMediaQuery, Theme, Divider, Stack, Button, Typography } from '@mui/material';
import { Organization } from '../../../models/organization';
import OrganizationSelect from './OrganizationSelect';
import MonthFilter from './MonthFilter';
import { OrderStatusType } from '@halapp/common';
import moment from 'moment';
import { TypeFilter } from './TypeFilter';

interface OrdersFiltersProps {
  Organizations: Organization[];
  Filter: OrderStatusType | moment.Moment | undefined;
  SetFilter: (filter: OrderStatusType | moment.Moment) => void;
  SetOrganization: (organizationId: string) => void;
  SelectedOrganization: string | null;
}

const OrdersFilters = ({
  Organizations,
  SetFilter,
  Filter,
  SetOrganization,
  SelectedOrganization
}: OrdersFiltersProps) => {
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Stack spacing={2} sx={{ display: 'flex', height: '100%', mt: '10px', mb: '10px' }}>
      <OrganizationSelect
        Organizations={Organizations}
        SetOrganization={SetOrganization}
        SelectedOrganization={SelectedOrganization}
      />
      {!expanded && matchesSM && (
        <Button
          sx={{ textTransform: 'none' }}
          size="small"
          variant="text"
          color="blackNWhite"
          onClick={() => setExpanded(true)}>
          {'daha fazla filtre'}
        </Button>
      )}
      {(!matchesSM || expanded) && (
        <>
          <Divider variant="middle" />
          <MonthFilter SetMonth={SetFilter} Filter={moment.isMoment(Filter) ? Filter : null} />
          <Divider>
            <Typography variant="body2">{'veya'}</Typography>
          </Divider>
          <TypeFilter
            SetType={SetFilter}
            Filter={
              Filter && Object.keys(OrderStatusType).includes(Filter as OrderStatusType)
                ? (Filter as OrderStatusType)
                : null
            }
          />
        </>
      )}
      {expanded && matchesSM && (
        <Button
          sx={{ textTransform: 'none' }}
          size="small"
          variant="text"
          color="blackNWhite"
          onClick={() => setExpanded(false)}>
          {'daha az filtre'}
        </Button>
      )}
    </Stack>
  );
};

export default OrdersFilters;
