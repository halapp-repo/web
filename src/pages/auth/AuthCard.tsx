import { ReactNode } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// material-ui
import { Box, IconButton, Alert, Button } from '@mui/material';

// project import
import MainCard from '../../components/MainCard';
import Logo from '../../components/logo/Logo';
import { selectUserAuth } from '../../store/auth/authSlice';
import { useAppSelector } from '../../store/hooks';
import { Link, useSearchParams } from 'react-router-dom';

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
}: Props) => {
  const userAuth = useAppSelector(selectUserAuth);
  const [searchParams] = useSearchParams();

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
      <Box
        sx={{
          p: { xs: 2, sm: 2, md: 3, xl: 5 },
          display: 'flex',
          justifyContent: 'space-between'
        }}>
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
      {userAuth.error && (
        <Alert variant="outlined" severity="error">
          {`${userAuth.error.message}`}
          {userAuth.error.ErrorCode === 'UsernameExistsException' && searchParams.get('code') && (
            <Box>
              {`Lütfen Giriş Yapın`}
              <Button
                variant="text"
                component={Link}
                to={`/auth/signin?code=${searchParams.get('code')}`}>
                {'Giris yap'}
              </Button>
            </Box>
          )}
        </Alert>
      )}
      <Box sx={{ p: { xs: 2, sm: 2, md: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
};

export default AuthCard;
