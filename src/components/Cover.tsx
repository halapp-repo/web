import { Box } from '@mui/material';
import Logo from '../components/logo/Logo';

const Cover = () => {
  return (
    <Box sx={{ flex: '1', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <Logo Size="large" />
    </Box>
  );
};
export { Cover };
