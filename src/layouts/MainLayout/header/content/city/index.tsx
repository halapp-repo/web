import { ButtonBase, Typography, Box, Stack } from '@mui/material';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { CityType } from '@halapp/common';
import { useLocation } from 'react-router-dom';
import { selectUICityIsOpen, toggleCity } from '../../../../../store/ui/uiSlice';

const CityNavButton = () => {
  const location = useLocation();
  const isOpen = useAppSelector(selectUICityIsOpen);
  const dispatch = useAppDispatch();
  const handleCityClicked = () => {
    dispatch(toggleCity());
  };
  const isIconShowable = (): boolean => {
    return (
      location.pathname === '/dashboard' ||
      location.pathname === '/shopping-cart' ||
      location.pathname === '/checkout'
    );
  };

  return (
    <>
      {isIconShowable() && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #d9d9d9',
            padding: '0px 5px',
            borderRadius: '8px'
          }}>
          <ButtonBase onClick={handleCityClicked}>
            <Stack direction={'row'}>
              <Typography fontSize={'18px'} fontWeight={'bold'}>
                {CityType.istanbul}
              </Typography>
              {isOpen && (
                <CaretUpOutlined
                  style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}
                />
              )}
              {isOpen || (
                <CaretDownOutlined
                  style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}
                />
              )}
            </Stack>
          </ButtonBase>
        </Box>
      )}
    </>
  );
};

export { CityNavButton };
