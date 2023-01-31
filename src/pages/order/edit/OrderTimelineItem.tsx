import { Box, Card, CardContent, Typography } from '@mui/material';
import { OrderEvent } from '../../../models/order';
import { OrderEventType } from '@halapp/common';
import { red, green } from '@mui/material/colors';
import { OrderTimelineItemContent } from './OrderTimelineItemContent';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';

interface OrderTimelineItemProps {
  Event: OrderEvent;
}

const OrderTimelineItem = ({ Event }: OrderTimelineItemProps) => {
  const getContent = () => {
    switch (Event.EventType) {
      case OrderEventType.OrderCreatedV1: {
        return (
          <>
            <OrderTimelineItemContent Event={Event}>
              <Box
                sx={{
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  justifyItems: 'center'
                }}>
                <Typography variant="h5">{'Sipariş Verildi'}</Typography>
              </Box>
            </OrderTimelineItemContent>
            <Box className="circle created">
              <ShoppingCartOutlined width={'20px'} height={'20px'} />
            </Box>
          </>
        );
      }
      case OrderEventType.OrderCanceledV1: {
        return (
          <>
            <OrderTimelineItemContent
              Event={Event}
              sx={{
                minHeight: '100px',
                paddingRight: '5px'
              }}>
              <Box
                sx={{
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  justifyItems: 'center'
                }}>
                <Typography variant="h5">{'Sipariş Iptal Edildi'}</Typography>
              </Box>
            </OrderTimelineItemContent>
            <Box className="circle canceled">
              <DeleteOutlined width={'20px'} height={'20px'} />
            </Box>
          </>
        );
      }
    }
  };
  return (
    <Card
      sx={{
        overflow: 'visible',
        marginLeft: '20px',
        padding: '0px 0px 0px 10px',
        width: '90%',
        '&:after': {
          content: "' '",
          backgroundColor: 'background.paper',
          position: 'absolute',
          boxShadow: '-1px 1px 1px rgba(0, 0, 0, 0.2)',
          left: '29px',
          top: 'calc(50% - 7.5px)',
          transform: 'rotate(45deg)',
          width: '15px',
          height: '15px'
        }
      }}>
      <CardContent
        sx={{
          p: '0px !important',
          '& .circle': {
            backgroundColor: '#fff',
            border: '3px solid #e17b77',
            borderRadius: '50%',
            position: 'absolute',
            top: 'calc(50% - 14px)',
            left: '-14px',
            width: '30px',
            height: '30px',
            zIndex: '100',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          },
          '& .created': {
            border: `3px solid ${green['A400']}`
          },
          '& .canceled': {
            border: `3px solid ${red[500]}`
          }
        }}>
        {getContent()}
      </CardContent>
    </Card>
  );
};

export { OrderTimelineItem };
