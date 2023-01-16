import { Divider, Stack } from '@mui/material';
import { Organization } from '../../models/organization';
import OrganizationSelect from './OrganizationSelect';
import MonthFilter from './MonthFilter';
import { OrderStatus } from '../../models/order-status';
import moment from 'moment';

interface OrdersFiltersProps {
  Organizations: Organization[];
  Filter: OrderStatus | moment.Moment | null;
  SetFilter: (filter: OrderStatus | moment.Moment) => void;
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
  return (
    <Stack spacing={2} sx={{ display: 'flex', height: '100%', mt: '10px', mb: '10px' }}>
      <OrganizationSelect
        Organizations={Organizations}
        SetOrganization={SetOrganization}
        SelectedOrganization={SelectedOrganization}
      />
      <Divider variant="middle" />
      <MonthFilter SetMonth={SetFilter} Filter={moment.isMoment(Filter) ? Filter : null} />
    </Stack>
  );
};

export default OrdersFilters;
