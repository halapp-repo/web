import { Typography, Box, Select, MenuItem } from '@mui/material';
import { OrderStatusType } from '@halapp/common';
import { FieldTimeOutlined } from '@ant-design/icons';
import { translateOrderStatus } from '../../../utils/english-turkish-translator';

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
          value={Filter}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              const type: OrderStatusType = OrderStatusType[value as keyof typeof OrderStatusType];
              SetType(type);
            }
          }}>
          <MenuItem value={OrderStatusType.Created}>
            {translateOrderStatus(OrderStatusType.Created)}
          </MenuItem>
          <MenuItem value={OrderStatusType.Delivered}>
            {translateOrderStatus(OrderStatusType.Delivered)}
          </MenuItem>
          <MenuItem value={OrderStatusType.Paid}>
            {translateOrderStatus(OrderStatusType.Paid)}
          </MenuItem>
        </Select>
      </Box>
    </>
  );
};

export { TypeFilter };
