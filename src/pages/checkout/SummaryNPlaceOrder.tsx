import { Stack, Box, Button, Typography, Divider } from '@mui/material';
import { ShoppingCartDTO } from '../../models/dtos/shopping-cart-list-item.dto';

interface SummaryNPlaceOrderProps {
  ShoppingCart: ShoppingCartDTO;
}

const SummaryNPlaceOrder = ({ ShoppingCart }: SummaryNPlaceOrderProps) => {
  return (
    <Stack spacing={1}>
      <Box>
        <Button variant="contained" sx={{ width: '100%', fontWeight: 'bold' }}>
          {'Ürünleri gönder'}
        </Button>
        <Typography variant="body2" color="secondary">
          {"By placing your order, you agree to HalApp's privacy notice and condition of use"}
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h5" fontWeight={'bold'} sx={{ mb: '10px' }}>
          {'Teslimat özeti'}
        </Typography>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="body2">{`Ürünler (${ShoppingCart.Items.length}):`}</Typography>
          <Typography variant="body2">{`${ShoppingCart.TotalAmount}`}</Typography>
        </Stack>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="body2">{`Taşıma ve nakliye:`}</Typography>
          <Typography variant="body2">{`${ShoppingCart.TotalAmount}`}</Typography>
        </Stack>
      </Box>
      <Divider />
      <Box>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography variant="h4" color="primary">{`Toplam ücret:`}</Typography>
          <Typography variant="h4" color="primary">{`${ShoppingCart.TotalAmount}`}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export { SummaryNPlaceOrder };
