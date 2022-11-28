import { Button, Divider, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ShoppingCart } from '../../models/shopping-cart';

interface SummaryNCheckoutProps {
  ShoppingCart: ShoppingCart;
}

const SummaryNCheckout = ({ ShoppingCart }: SummaryNCheckoutProps) => {
  const location = useLocation();

  return (
    <>
      <Divider sx={{ marginBottom: '10px' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
        <Typography variant="body1">
          <strong>{'Toplam :'}</strong>
        </Typography>
        <Typography variant="body1">
          <strong>{ShoppingCart.TotalAmount}</strong>
        </Typography>
      </Box>
      {location.pathname !== '/dashboard' && (
        <Button sx={{ width: '100%', marginBottom: '5px' }} variant="outlined">
          {'Continue shopping'}
        </Button>
      )}
      <Button sx={{ width: '100%' }} variant="contained">
        {'Checkout'}
      </Button>
    </>
  );
};

export default SummaryNCheckout;
