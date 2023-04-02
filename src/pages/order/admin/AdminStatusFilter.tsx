import { FieldTimeOutlined } from '@ant-design/icons';
import { OrderStatusType } from '@halapp/common';
import { Box, MenuItem, Select, Typography } from '@mui/material';

import { DateRangeType } from '../../../models/types/date-range.type';
import { OrderStatusExtendedType } from '../../../models/types/order-status-extended.type';

interface TypeFilterProps {
  Filter: OrderStatusType | OrderStatusExtendedType;
  DateRangeFilter: DateRangeType;
  SetStatus: (filter: OrderStatusType | OrderStatusExtendedType) => void;
}

const AdminStatusFilter = ({ Filter, SetStatus, DateRangeFilter }: TypeFilterProps) => {
  return (
    <>
      <Box sx={{ padding: '0px 10px' }}>
        <Typography variant="body2" fontWeight={'bold'}>
          <FieldTimeOutlined /> {'Status'}
        </Typography>
        <Select
          fullWidth
          sx={{ marginTop: '10px' }}
          value={Filter}
          onChange={(e) => {
            const value = e.target.value;
            const type: OrderStatusType = OrderStatusType[value as keyof typeof OrderStatusType];
            if (type) {
              SetStatus(type);
            } else {
              SetStatus(OrderStatusExtendedType.AllStatus);
            }
          }}>
          {Object.entries(OrderStatusType).map(([k, v]) => {
            return (
              <MenuItem key={k} value={k}>
                {v}
              </MenuItem>
            );
          })}
          {DateRangeFilter !== DateRangeType['All Time'] && (
            <MenuItem
              key={OrderStatusExtendedType.AllStatus}
              value={OrderStatusExtendedType.AllStatus}>
              {OrderStatusExtendedType.AllStatus}
            </MenuItem>
          )}
        </Select>
      </Box>
    </>
  );
};

export { AdminStatusFilter };
