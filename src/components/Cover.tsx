import { Box, Stack, LinearProgress } from '@mui/material';
import Logo from '../components/logo/Logo';
import LogoText from './logo/LogoText';

const Cover = () => {
  return (
    <Box sx={{ flex: '1', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <Stack spacing={2}>
        <Logo Size="large" />
        <Stack sx={{ alignItems: 'center' }}>
          <LogoText />
        </Stack>
        <LinearProgress />
      </Stack>
    </Box>
  );
};
export { Cover };
