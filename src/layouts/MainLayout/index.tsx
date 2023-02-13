import { Box, Toolbar, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header';
import LayoutInitializer from '../../components/LayoutInitializer';
import Footer from './footer';
import { ModalCitySelect } from './header/content/city/ModalCitySelect';

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
        <Box
          component="main"
          sx={{
            width: '100%',
            flex: 1,
            flexGrow: 1
          }}>
          <Toolbar />
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Outlet />
          </Box>
        </Box>
        <Footer />
        <Grid container>
          <Grid item>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <ModalCitySelect />
            </Grid>
          </Grid>
        </Grid>
      </LayoutInitializer>
    </Box>
  );
};

export default MainLayout;
