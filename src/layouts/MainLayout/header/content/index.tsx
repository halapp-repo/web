import { Box, Theme, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';

import Logo from '../../../../components/logo/Logo';
import LogoText from '../../../../components/logo/LogoText';
import { useAppDispatch } from '../../../../store/hooks';
import { updateListingSelectedDate } from '../../../../store/ui/uiSlice';
import NavigationButtons from './NavigationButtons';

const HeaderContent = () => {
  const dispatch = useAppDispatch();
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <NavLink onClick={() => dispatch(updateListingSelectedDate())} to="/">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Logo />
          {matchesSm || (
            <Box sx={{ mt: '15px' }}>
              <LogoText />
            </Box>
          )}
        </div>
      </NavLink>
      <Box sx={{ width: '100%', ml: 1 }} />
      <NavigationButtons />
    </>
  );
};

export default HeaderContent;
