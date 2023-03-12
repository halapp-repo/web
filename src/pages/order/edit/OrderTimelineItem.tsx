import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { OrderEvent } from '../../../models/events/order-event';
import { OrderEventType } from '@halapp/common';
import { red, green, blue, purple, blueGrey, lightBlue } from '@mui/material/colors';
import { OrderTimelineItemContent } from './OrderTimelineItemContent';
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  EditOutlined,
  MinusCircleOutlined,
  CodeSandboxOutlined
} from '@ant-design/icons';
import { OrderItemsUpdatedV1Payload } from '../../../models/events/payloads/order-items-updated-v1.payload';

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
      case OrderEventType.OrderPickedUpV1: {
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
                <Typography variant="h5">{'Sipariş Hazırlandı'}</Typography>
              </Box>
            </OrderTimelineItemContent>
            <Box className="circle pickedup">
              <CodeSandboxOutlined width={'20px'} height={'20px'} />
            </Box>
          </>
        );
      }
      case OrderEventType.OrderDeliveredV1: {
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
                <Typography variant="h5">{'Sipariş Teslim Edildi'}</Typography>
              </Box>
            </OrderTimelineItemContent>
            <Box className="circle delivered">
              <EnvironmentOutlined width={'20px'} height={'20px'} />
            </Box>
          </>
        );
      }
      case OrderEventType.OrderPaidV1: {
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
                <Typography variant="h5">{'Sipariş Ödendi'}</Typography>
              </Box>
            </OrderTimelineItemContent>
            <Box className="circle paid">
              <Typography fontSize={'20px'}>{'₺'}</Typography>
            </Box>
          </>
        );
      }
      case OrderEventType.OrderItemsUpdatedV1: {
        const payload = Event.Payload as OrderItemsUpdatedV1Payload;
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
                  minHeight: '70px'
                }}>
                <Typography variant="h5" textAlign={'center'}>
                  {'Sipariş Düzenlendi'}
                </Typography>
                <List>
                  {payload.DeletedItems.map((i) => (
                    <ListItem key={`deleted-${i.ProductId}`}>
                      <ListItemIcon>
                        <MinusCircleOutlined />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: '10px' }}
                        primary={i.ProductName || i.ProductId}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </OrderTimelineItemContent>
            <Box className="circle itemsUpdated">
              <EditOutlined width={'20px'} height={'20px'} />
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
            backgroundColor: '#fafafb',
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
            border: `3px solid ${red['A400']}`
          },
          '& .pickedup': {
            border: `3px solid ${lightBlue['A400']}`
          },
          '& .delivered': {
            border: `3px solid ${blue['A400']}`
          },
          '& .paid': {
            border: `3px solid ${purple['A400']}`
          },
          '& .itemsUpdated': {
            border: `3px solid ${blueGrey['A400']}`
          }
        }}>
        {getContent()}
      </CardContent>
    </Card>
  );
};

export { OrderTimelineItem };
