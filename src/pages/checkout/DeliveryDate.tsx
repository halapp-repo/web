import { useEffect, useState } from 'react';
import { Box, List, Radio, RadioGroup, ListItem, ListItemText, Typography } from '@mui/material';
import { OrderDeliveryTime } from '../../models/order-delivery-time-type';
import { trMoment } from '../../utils/timezone';
import moment from 'moment';

type OrderDeliveryTuple = [string, string];

const DeliveryDate = () => {
  const [selectedTime, setSelectedTime] = useState(OrderDeliveryTime.morning);

  const createOptions = (): OrderDeliveryTuple[] => {
    return Object.keys(OrderDeliveryTime).map((odt) => {
      if (odt === OrderDeliveryTime.morning) {
        trMoment();
        return [odt, 'xxx'];
      }
      throw new Error('Unsupported type');
    });
  };
  const handleChangeDeliveryDate = (selectedDate: string) => {
    setSelectedTime(OrderDeliveryTime[selectedDate as keyof typeof OrderDeliveryTime]);
  };

  return (
    <RadioGroup value={selectedTime}>
      <List
        subheader={
          <Box
            sx={{
              padding: '4px 8px 4px 8px',
              display: 'flex',
              marginBottom: '10px'
            }}>
            <Typography fontWeight={'bold'}>{'Teslimat Tarihi'}</Typography>
          </Box>
        }>
        {createOptions().map(([key, value]: OrderDeliveryTuple) => {
          console.log(key, value);
          return (
            <ListItem
              selected={true}
              button
              key={key}
              onClick={() => handleChangeDeliveryDate(key)}
              sx={{
                margin: '5px 0px 5px 0px',
                padding: '3px 10px',
                boxShadow: 'sm',
                bgcolor: 'background.body',
                '&.Mui-selected': {
                  backgroundColor: 'inherit',
                  border: '1px solid #ffc423',
                  borderRadius: '8px'
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'inherit'
                }
              }}
              secondaryAction={<Radio value={key} />}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography fontWeight={'bold'}>{value}</Typography>
                  </Box>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </RadioGroup>
  );
};

export { DeliveryDate };
