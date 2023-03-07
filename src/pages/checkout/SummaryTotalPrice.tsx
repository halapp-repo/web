import { Stack, Typography, Box } from '@mui/material';
import { ShoppingCartList } from '../../models/viewmodels/shopping-cart-list-item';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { useAppSelector } from '../../store/hooks';

interface SummaryTotalPriceProps {
  ShoppingCart: ShoppingCartList;
}

const SummaryTotalPrice = ({ ShoppingCart }: SummaryTotalPriceProps) => {
  const selectedCity = useAppSelector(selectSelectedCity);

  return (
    <Box>
      <Typography variant="body2" color="secondary">
        Ürünler, <b>{`${selectedCity}`}</b>
        {`'a göre fiyatlandırılmıştır.`}
      </Typography>
      <Stack direction={'row'} justifyContent="flex-start">
        <Typography variant="body2" color="secondary">
          <b>Fiyatlara KDV dahildir.</b>
        </Typography>
      </Stack>
      <Stack direction={'row'} justifyContent="space-between">
        <Typography variant="h4" color="primary">{`Toplam ücret:`}</Typography>
        <Typography variant="h4" color="primary">{`${ShoppingCart.TotalAmount}`}</Typography>
      </Stack>
    </Box>
  );
};

export { SummaryTotalPrice };
