import { Stack, IconButton, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ShopOutlined, ShopFilled } from '@ant-design/icons';

const defaultStyle = {
  textDecoration: 'none'
};
const activeIconStyle = {
  textDecoration: 'none',
  borderBottom: '5px solid rgb(255, 196, 35)'
};
const activeButtonStyle = {
  textDecoration: 'none'
};

const NavigationButtons = () => {
  return (
    <Stack direction="row" spacing={2}>
      <NavLink
        to="/organization/enrollment"
        style={({ isActive }) => (isActive ? activeButtonStyle : defaultStyle)}
        // eslint-disable-next-line react/no-children-prop
        children={({ isActive }) => {
          return (
            <Button
              variant="outlined"
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
        children={({ isActive }) => {
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
      {/* <NavLink
        to="/dashboard"
        style={({ isActive }) => (isActive ? activeIconStyle : defaultStyle)}
        // eslint-disable-next-line react/no-children-prop
        children={({ isActive }) => {
          return (
            <IconButton sx={{ fontSize: '2rem', color: 'text.primary' }} disableRipple>
              {isActive ? <ShopFilled /> : <ShopOutlined />}
            </IconButton>
          );
        }}
      /> */}
    </Stack>
  );
};

export default NavigationButtons;
