import { Box, LinearProgress, Stack } from '@mui/material';

import Logo from '../components/logo/Logo';
import LogoText from './logo/LogoText';

const Cover = () => {
  return (
    <Box sx={{ flex: '1', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <Stack spacing={2}>
        <Stack sx={{ alignItems: 'center' }}>
          <Logo Size="large" />
          <LogoText Size="large" />
        </Stack>
        <LinearProgress />
      </Stack>
    </Box>
  );
};
export { Cover };
