import { AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Content from './content';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Toolbar>
        <Content />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
