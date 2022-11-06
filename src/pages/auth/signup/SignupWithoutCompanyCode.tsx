import { Typography, Stack, Box, Button, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// project import
import MainCard from '../../../components/MainCard';

const SignUpWithoutCompanyCode = () => {
  return (
    <Stack spacing={2}>
      <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1">{'Kayıt olmak için üye olun'}</Typography>
          <Button variant="text" component={RouterLink} to="/organization/enrollment">
            {' Üye ol'}
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Divider sx={{ width: '80%' }}>veya</Divider>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1">{"HalApp'e üyeyseniz"}</Typography>
          <Button variant="text" component={RouterLink} to="/auth/signin">
            {'Giris yap'}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default SignUpWithoutCompanyCode;
