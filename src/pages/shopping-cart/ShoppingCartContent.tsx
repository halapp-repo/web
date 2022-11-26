import { Box } from '@mui/material';
import ShoppingCartItemCounter from './ShoppingCartItemCounter';
import SummaryNCheckout from './SummaryNCheckout';

const ShoppingCartContent = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <ShoppingCartItemCounter />
      </Box>
      <Box sx={{ flexGrow: '1', p: '16px' }}></Box>
      <Box sx={{ p: '16px' }}>
        <SummaryNCheckout />
      </Box>
    </Box>
  );
};

export default ShoppingCartContent;
