import { ProductType } from '@halapp/common';
import { Divider, Stack, Typography, Button } from '@mui/material';
import { selectSelectedCity } from '../../store/cities/citiesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTodaysPrices } from '../../store/prices/pricesSlice';

const SummaryError = () => {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(selectSelectedCity);

  const handleRetry = () => {
    dispatch(
      fetchTodaysPrices({
        location: selectedCity,
        type: ProductType.produce
      })
    );
  };

  return (
    <>
      <Divider sx={{ marginBottom: '10px' }} />
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5">{'Eyvah!'}</Typography>
        <Typography variant="body1" color="text.secondary">
          {'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.'}
        </Typography>
        <Button color="primary" variant="contained" sx={{ width: '200px' }} onClick={handleRetry}>
          {'Yeniden Dene.'}
        </Button>
      </Stack>
    </>
  );
};

export default SummaryError;
