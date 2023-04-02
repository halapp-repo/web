import { CityType } from '@halapp/common';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';

import { selectSelectedCity } from '../../../../../store/cities/citiesSlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { selectUICityIsOpen, toggleCity } from '../../../../../store/ui/uiSlice';

const DialogCityContent = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectUICityIsOpen);
  const city = useAppSelector(selectSelectedCity);
  const [selectedCity, setSelectedCity] = useState<CityType>(city);

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '375px'
        }
      }}
      sx={{ borderRadius: '8px' }}
      onClose={() => dispatch(toggleCity(false))}
      open={open}>
      <DialogTitle
        sx={{ backgroundColor: '#F0F2F2', padding: '0 24px', borderBottom: '1px solid #D5D9D9' }}>
        <Typography
          fontWeight={700}
          fontSize={'16px'}
          sx={{ padding: '16px 0', minHeight: '56px', lineHeight: '24px' }}>
          {'Şehrini seç'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box />
          <Typography variant="body2" color="secondary">
            {'Ürünler ve ürün fiyatları her şehir için farklı olabilir.'}
          </Typography>
          <Select
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
      </DialogContent>
      <DialogActions
        sx={{
          paddingLeft: '24px',
          paddingRight: '24px',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
        <Button variant="outlined" color="blackNWhite" onClick={() => dispatch(toggleCity(false))}>
          {'Kapat'}
        </Button>
        <Button disabled={city === selectedCity} variant="contained">
          {'Şehri Değiştir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogCityContent };
