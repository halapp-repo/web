import { ProductType } from '@halapp/common';
import { Divider } from '@mui/material';

import { RetryOnError } from '../../components/RetryOnError';
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
      <RetryOnError HandleRetry={handleRetry} />
    </>
  );
};

export default SummaryError;
