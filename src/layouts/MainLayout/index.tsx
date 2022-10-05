import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header/index';
import LayoutInitializer from '../../components/LayoutInitializer';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <LayoutInitializer>
          <Outlet />
        </LayoutInitializer>
      </Box>
    </Box>
  );
};

export default MainLayout;
