import { Box } from '@mui/material';
import Logo from '../components/logo/Logo';

const Overlay = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: '1',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        display: 'flex',
        backgroundColor: '#fafafb'
      }}>
      <Logo Size="large" />
    </Box>
  );
};
export { Overlay };
