import { Box, Stack, useMediaQuery, Theme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../../../../components/logo/Logo';
import LogoText from '../../../../components/logo/LogoText';
import NavigationButtons from './NavigationButtons';

const HeaderContent = () => {
  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <>
      <NavLink
        to="/"
        // eslint-disable-next-line react/no-children-prop
        children={() => {
          return (
            <Stack direction={'row'}>
              <Logo />
            </Stack>
          );
        }}
      />
      {matchesMd || <LogoText Size="medium" />}
      <Box sx={{ width: '100%', ml: 1 }} />
      <NavigationButtons />
    </>
  );
};

export default HeaderContent;
