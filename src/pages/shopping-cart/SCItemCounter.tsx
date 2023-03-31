import { Stack, Box } from '@mui/material';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';

interface ShoppingCartItemCounterProps {
  ShoppingCart: ShoppingCartList;
}

const ShoppingCartItemCounter = ({ ShoppingCart }: ShoppingCartItemCounterProps) => {
  return (
    <Stack direction={'row'} spacing={2} sx={{ padding: '8px 16px 8px 16px' }}>
      <Box>🛒</Box>
      <Box>
        Ürün çeşidi <b>{ShoppingCart.ActiveItems.length}</b>
      </Box>
    </Stack>
  );
};

export default ShoppingCartItemCounter;
