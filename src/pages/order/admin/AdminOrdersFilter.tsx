import { Stack } from '@mui/material';
import { AdminDateFilter } from './AdminDateFilter';
import { AdminStatusFilter } from './AdminStatusFilter';
import { OrderStatusExtendedType } from '../../../models/types/order-status-extended.type';
import { DateRangeType } from '../../../models/types/date-range.type';
import { OrderStatusType } from '@halapp/common';
import { DateRange } from './date-range.type';

interface AdminOrderFilterProps {
  DateRangeFilter: DateRangeType;
  StatusFilter: OrderStatusType | OrderStatusExtendedType;
  SetDateRangeFilter: (range: DateRangeType) => void;
  SetStatusFilter: (status: OrderStatusType | OrderStatusExtendedType) => void;
  Range: DateRange;
}

const AdminOrderFilter = ({
  DateRangeFilter,
  StatusFilter,
  SetDateRangeFilter,
  SetStatusFilter,
  Range
}: AdminOrderFilterProps) => {
  return (
    <Stack spacing={2} sx={{ height: '100%', mt: '10px', mb: '10px' }}>
      <AdminDateFilter Range={Range} Filter={DateRangeFilter} SetRange={SetDateRangeFilter} />
      <AdminStatusFilter
        Filter={StatusFilter}
        SetStatus={SetStatusFilter}
        DateRangeFilter={DateRangeFilter}
      />
    </Stack>
  );
};

export { AdminOrderFilter };
