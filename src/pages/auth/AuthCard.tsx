import { ReactNode } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// material-ui
import { Box, IconButton } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import Logo from '../../components/logo/Logo';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //
interface Props {
  children: ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  showPreviousButton?: boolean;
  showNextButton?: boolean;
}

const AuthCard = ({
  children,
  showNextButton,
  showPreviousButton,
  onPrevious = () => {
    return true;
  },
  onNext = () => {
    return true;
  }
}: Props) => (
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
    <Box
      sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 }, display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        {showPreviousButton && (
          <IconButton onClick={onPrevious}>
            <LeftOutlined />
          </IconButton>
        )}
      </Box>
      <Logo Size="medium" />
      <Box>
        {showNextButton && (
          <IconButton>
            <RightOutlined onClick={onNext} />
          </IconButton>
        )}
      </Box>
    </Box>
    <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

export default AuthCard;
