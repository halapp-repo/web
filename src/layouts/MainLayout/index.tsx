import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header';
import LayoutInitializer from '../../components/LayoutInitializer';
import Footer from './footer';
import { selectUIGlobalToolbarGutter } from '../../store/ui/uiSlice';
import { useAppSelector } from '../../store/hooks';

const MainLayout = () => {
  const toolbarGutterDisable = useAppSelector(selectUIGlobalToolbarGutter);
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
        <Header disableToolbarGutter={toolbarGutterDisable} />
        <Box
          component="main"
          sx={{
            width: '100%',
            flex: 1,
            flexGrow: 1
          }}>
          <Toolbar disableGutters={toolbarGutterDisable} />
          {toolbarGutterDisable ? (
            <Outlet />
          ) : (
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              <Outlet />
            </Box>
          )}
        </Box>
        <Footer />
      </LayoutInitializer>
    </Box>
  );
};

export default MainLayout;
