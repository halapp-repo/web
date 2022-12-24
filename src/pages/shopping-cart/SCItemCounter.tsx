import { Stack, Box } from '@mui/material';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';

interface ShoppingCartItemCounterProps {
  ShoppingCart: ShoppingCartList;
}

const ShoppingCartItemCounter = ({ ShoppingCart }: ShoppingCartItemCounterProps) => {
  return (
    <Stack direction={'row'} spacing={2} sx={{ padding: '8px 16px 8px 16px', color: '#ffc423' }}>
      <Box>🧺</Box>
      <Box>{`Ürün sayısı ${ShoppingCart.Items.length}`}</Box>
    </Stack>
  );
};

export default ShoppingCartItemCounter;
