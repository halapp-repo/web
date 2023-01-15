import {
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  Grid
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Order } from '../../models/order';

interface OrderListItemProps {
  Order: Order;
}

const OrderListItem = ({ Order }: OrderListItemProps) => {
  return (
    <Grid container rowSpacing={1} justifyContent="right" columnSpacing={1} alignItems="right">
      <Grid item xs={8}>
        <List>
          {Order.Items.map((i) => (
            <ListItem key={i.ProductId}>
              <ListItemText
                primary={i.ProductName || i.ProductId}
                secondary={`(${i.Count})${i.Unit} : ${new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY'
                }).format(i.totalPrice())} `}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ p: '5px', display: 'flex' }}>
          <Stack spacing={1}>
            <Box>
              <Typography variant="body2" fontWeight={'bold'}>
                {'Sipariş Tarihi'}
              </Typography>
              <Typography variant="body2">
                {Order.CreatedDate.format('DD.MM.YYYY HH:mm')}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={'bold'}>
                {'Toplam Ücret'}
              </Typography>
              <Typography variant="body1" color={red[900]}>
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY'
                }).format(Order.totalPrice())}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderListItem;
