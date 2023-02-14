import { Box, Stack, LinearProgress } from '@mui/material';
import Logo from '../components/logo/Logo';

const Cover = () => {
  return (
    <Box sx={{ flex: '1', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <Stack spacing={2}>
        <Logo Size="large" />
        <LinearProgress />
      </Stack>
    </Box>
  );
};
export { Cover };
