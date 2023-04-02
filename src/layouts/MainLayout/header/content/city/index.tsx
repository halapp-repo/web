import { CaretDownOutlined, CaretUpOutlined, EnvironmentOutlined } from '@ant-design/icons';
import {
  Box,
  ButtonBase,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import { StyledBadge } from '../../../../../components/StyledBadge';
import { selectUserAuth } from '../../../../../store/auth/authSlice';
import { selectSelectedCity } from '../../../../../store/cities/citiesSlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { selectUICityIsOpen, toggleCity } from '../../../../../store/ui/uiSlice';

const CityNavButton = () => {
  const location = useLocation();
  const { authenticated } = useAppSelector(selectUserAuth);
  const isOpen = useAppSelector(selectUICityIsOpen);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const selectedCity = useAppSelector(selectSelectedCity);

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
      {isIconShowable() &&
        (!authenticated && matchesSm ? (
          <IconButton aria-label="cart" size="medium" onClick={handleCityClicked}>
            <StyledBadge color="primary">
              <EnvironmentOutlined
                style={{ fontSize: '32px', color: theme.palette.secondary.dark }}
              />
            </StyledBadge>
          </IconButton>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #d9d9d9',
              padding: '0px 5px',
              borderRadius: '8px'
            }}>
            <ButtonBase onClick={handleCityClicked}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography fontSize={'18px'} fontWeight={'bold'}>
                  {selectedCity}
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
              </div>
            </ButtonBase>
          </Box>
        ))}
    </>
  );
};

export { CityNavButton };
