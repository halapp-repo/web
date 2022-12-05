import { AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Content from './content';

interface HeaderProps {
  disableToolbarGutter?: boolean;
}

const Header = ({ disableToolbarGutter = false }: HeaderProps) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: !disableToolbarGutter ? `1px solid ${theme.palette.divider}` : '0px' }}>
      <Toolbar>
        <Content />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
