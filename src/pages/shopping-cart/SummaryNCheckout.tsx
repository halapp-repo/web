import { Button, Divider, Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';

interface SummaryNCheckoutProps {
  ShoppingCart: ShoppingCartList;
}

const SummaryNCheckout = ({ ShoppingCart }: SummaryNCheckoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const checkout = () => {
    navigate('/checkout');
  };

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
        <Button
          sx={{ width: '100%', marginBottom: '5px' }}
          variant="outlined"
          color="blackNWhite"
          onClick={() => navigate('/dashboard')}>
          {'Alışverişe devam et'}
        </Button>
      )}
      <Button
        sx={{ width: '100%' }}
        variant="contained"
        disabled={ShoppingCart.Items.length === 0}
        onClick={checkout}>
        {'Teslimat adımına geç'}
      </Button>
    </>
  );
};

export default SummaryNCheckout;
