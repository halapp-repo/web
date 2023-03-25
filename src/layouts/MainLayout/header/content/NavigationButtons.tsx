import { Stack, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Profile from './profile';
import { useAppSelector } from '../../../../store/hooks';
import { selectUserAuth } from '../../../../store/auth/authSlice';
import { ShoppingCartNavButton } from './shopping-cart';
import { CityNavButton } from './city';

const defaultStyle = {
  textDecoration: 'none'
};
// const activeIconStyle = {
//   textDecoration: 'none',
//   borderBottom: '5px solid rgb(255, 196, 35)'
// };
const activeButtonStyle = {
  textDecoration: 'none'
};

const NavigationButtons = () => {
  const userAuth = useAppSelector(selectUserAuth);
  return (
    <Stack direction="row" spacing={2}>
      <CityNavButton />
      {!userAuth.authenticated && (
        <>
          <NavLink
            to="/organization/enrollment"
            style={({ isActive }) => (isActive ? activeButtonStyle : defaultStyle)}
            // eslint-disable-next-line react/no-children-prop
            children={() => {
              return (
                <Button
                  variant="outlined"
                  color="blackNWhite"
                  sx={{ whiteSpace: 'nowrap', minWidth: 'auto' }}
                  disableRipple>
                  {'Üye ol'}
                </Button>
              );
            }}
          />
          <NavLink
            to="/auth/signin"
            style={({ isActive }) => (isActive ? activeButtonStyle : defaultStyle)}
            // eslint-disable-next-line react/no-children-prop
            children={() => {
              return (
                <Button
                  variant="contained"
                  sx={{
                    whiteSpace: 'nowrap',
                    minWidth: 'auto'
                  }}
                  disableRipple>
                  <Typography>{'Giriş yap'}</Typography>
                </Button>
              );
            }}
          />
        </>
      )}
      {userAuth.authenticated && (
        <>
          <ShoppingCartNavButton />
          <Profile />
        </>
      )}
    </Stack>
  );
};

export default NavigationButtons;
