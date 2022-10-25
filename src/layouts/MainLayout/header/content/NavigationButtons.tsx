import { Stack, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ShopOutlined } from '@ant-design/icons';

const defaultStyle = {
  textDecoration: 'none'
};
const activeStyle = {
  textDecoration: 'none',
  borderBottom: '5px solid rgb(255, 196, 35)'
};

const NavigationButtons = () => {
  return (
    <Stack direction="row" spacing={2}>
      <NavLink to="/organization" style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}>
        <IconButton sx={{ fontSize: '2rem', color: 'text.primary' }} disableRipple>
          <ShopOutlined />
        </IconButton>
      </NavLink>
      <NavLink to="/dashboard" style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}>
        <IconButton sx={{ fontSize: '2rem' }} disableRipple>
          ₺
        </IconButton>
      </NavLink>
    </Stack>
  );
};

export default NavigationButtons;
