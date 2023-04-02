import { Box, LinearProgress, Stack } from '@mui/material';

import Logo from '../components/logo/Logo';
import LogoText from './logo/LogoText';

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
      <Stack spacing={2}>
        <Stack sx={{ alignItems: 'center' }}>
          <Logo Size="large" />
          <LogoText />
        </Stack>
        <LinearProgress />
      </Stack>
    </Box>
  );
};
export { Overlay };
