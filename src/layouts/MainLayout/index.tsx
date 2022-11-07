import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header';
import LayoutInitializer from '../../components/LayoutInitializer';
import Footer from './footer';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        flexDirection: 'column'
      }}>
      <LayoutInitializer>
        <Header />
        <Box component="main" sx={{ width: '100%', flex: 1, flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Toolbar />
          <Outlet />
        </Box>
        <Footer />
      </LayoutInitializer>
    </Box>
  );
};

export default MainLayout;
