import { Box, Stack, useMediaQuery, Theme } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../../../components/logo/Logo';
import LogoText from '../../../../components/logo/LogoText';
import NavigationButtons from './NavigationButtons';

const HeaderContent = () => {
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <>
      <NavLink
        onClick={() => {
          navigate('/dashboard');
          navigate(0);
        }}
        to="/"
        // eslint-disable-next-line react/no-children-prop
        children={() => {
          return (
            <Stack direction={'row'}>
              <Logo />
              {matchesSm || (
                <Box sx={{ mt: '15px' }}>
                  <LogoText Size="medium" />
                </Box>
              )}
            </Stack>
          );
        }}
      />
      <Box sx={{ width: '100%', ml: 1 }} />
      <NavigationButtons />
    </>
  );
};

export default HeaderContent;
