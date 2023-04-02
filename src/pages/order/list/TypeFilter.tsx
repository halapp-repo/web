import { FieldTimeOutlined } from '@ant-design/icons';
import { OrderStatusType, translateOrderStatus } from '@halapp/common';
import { Box, MenuItem, Select, Typography } from '@mui/material';

interface TypeFilterProps {
  Filter: OrderStatusType | null;
  SetType: (filter: OrderStatusType) => void;
}

const TypeFilter = ({ Filter, SetType }: TypeFilterProps) => {
  return (
    <>
      <Box sx={{ padding: '0px 10px' }}>
        <Typography variant="body2" fontWeight={'bold'}>
          <FieldTimeOutlined /> {'Duruma göre'}
        </Typography>
        <Select
          fullWidth
          sx={{ marginTop: '10px' }}
          value={Filter || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              const type: OrderStatusType = OrderStatusType[value as keyof typeof OrderStatusType];
              SetType(type);
            }
          }}>
          {Object.entries(OrderStatusType).map(([k, v]) => {
            return (
              <MenuItem key={k} value={k}>
                {translateOrderStatus(v)}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </>
  );
};

export { TypeFilter };
