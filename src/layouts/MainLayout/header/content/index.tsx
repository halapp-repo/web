import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../../../../components/logo/Logo';
import NavigationButtons from './NavigationButtons';

const HeaderContent = () => {
  return (
    <>
      <NavLink
        to="/"
        // eslint-disable-next-line react/no-children-prop
        children={() => {
          return <Logo />;
        }}
      />
      <Box sx={{ width: '100%', ml: 1 }} />
      <NavigationButtons />
    </>
  );
};

export default HeaderContent;
