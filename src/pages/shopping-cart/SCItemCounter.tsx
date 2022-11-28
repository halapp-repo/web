import { Stack, Box } from '@mui/material';
import { ShoppingOutlined } from '@ant-design/icons';
import { ShoppingCart } from '../../models/shopping-cart';

interface ShoppingCartItemCounterProps {
  ShoppingCart: ShoppingCart;
}

const ShoppingCartItemCounter = ({ ShoppingCart }: ShoppingCartItemCounterProps) => {
  return (
    <Stack
      direction={'row'}
      spacing={2}
      sx={{ padding: '8px 16px 8px 16px', bgcolor: '#051e34', color: '#ffc423' }}>
      <Box>
        <ShoppingOutlined />
      </Box>
      <Box>{`Ürün sayısı ${ShoppingCart.Items.length}`}</Box>
    </Stack>
  );
};

export default ShoppingCartItemCounter;
