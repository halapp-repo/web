import { Box } from '@mui/material';
import Logo from '../../../../components/logo/Logo';
import NavigationButtons from './NavigationButtons';

const HeaderContent = () => {
  return (
    <>
      <Logo />
      <Box sx={{ width: '100%', ml: 1 }} />
      <NavigationButtons />
    </>
  );
};

export default HeaderContent;
