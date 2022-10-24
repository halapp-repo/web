import { ReactNode } from 'react';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import Logo from '../../components/logo/Logo';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //
interface Props {
  children: ReactNode;
}

const AuthCard = ({ children }: Props) => (
  <MainCard
    sx={{
      minWidth: { xs: '100%', md: 350 },
      maxWidth: { xs: '100%', md: 350 },
      minHeight: { xs: '100vh', sm: 'inherit' },
      margin: { xs: 0, sm: 1, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}>
    <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 }, display: 'flex', justifyContent: 'center' }}>
      <Logo Size="medium" />
    </Box>
    <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

export default AuthCard;
