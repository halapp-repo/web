import { Typography, Grid, Stack, Box, Button, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// project import
import MainCard from '../../../components/MainCard';
import Logo from '../../../components/logo/Logo';

const SignUpWithoutCode = () => {
  return (
    <MainCard
      sx={{
        minWidth: { xs: '100%', md: 350 },
        maxWidth: { xs: '100%', md: 350 },
        // minHeight: { xs: '100vh', sm: 'inherit' },
        margin: { xs: 0, sm: 1, md: 3 },
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%'
        }
      }}>
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
    </MainCard>
  );
};

export default SignUpWithoutCode;
