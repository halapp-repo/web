import { Typography, Stack, Select, MenuItem, Button } from '@mui/material';
import { CityType } from '@halapp/common';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { toggleCity } from '../../../../../store/ui/uiSlice';
import { useState } from 'react';
import { selectSelectedCity } from '../../../../../store/cities/citiesSlice';

const DrawerCityContent = () => {
  const city = useAppSelector(selectSelectedCity);
  const [selectedCity, setSelectedCity] = useState<CityType>(city);
  const dispatch = useAppDispatch();

  return (
    <Stack sx={{ width: '100%', height: '100%' }} spacing={1} justifyContent="space-between">
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          {'Şehrini seç'}
        </Typography>
        <Typography variant="body1" color="secondary">
          {'Ürünler ve ürün fiyatları her şehir için farklı olabilir.'}
        </Typography>
        <Select
          autoFocus={true}
          value={selectedCity}
          onChange={(e) => {
            const newCity = CityType[e.target.value as keyof typeof CityType];
            if (newCity) {
              setSelectedCity(newCity);
            }
          }}>
          {Object.entries(CityType).map(([k, v]) => (
            <MenuItem key={k} value={k}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack direction={'row'} justifyContent="space-between">
        <Button variant="outlined" color="blackNWhite" onClick={() => dispatch(toggleCity(false))}>
          {'Kapat'}
        </Button>
        <Button disabled={city === selectedCity} variant="contained">
          {'Şehri Değiştir'}
        </Button>
      </Stack>
    </Stack>
  );
};

export { DrawerCityContent };
