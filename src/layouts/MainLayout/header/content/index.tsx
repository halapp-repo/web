import { Box, useMediaQuery, Theme } from '@mui/material';
import Logo from '../../../../components/logo/Logo';

const HeaderContent = () => {
  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <>
      {!matchesMd && <Box sx={{ width: '8%', ml: 1 }} />}
      <Logo />
    </>
  );
};

export default HeaderContent;
