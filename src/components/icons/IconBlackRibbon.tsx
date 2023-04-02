import { SvgIcon } from '@mui/material';

import { ReactComponent as IconContent } from './iconBlackRibbon.svg';

const IconBlackRibbon = () => {
  return (
    <SvgIcon sx={{ display: 'flex', width: '1em', height: '1.5em', mr: 1, fontSize: '2em' }}>
      <IconContent />
    </SvgIcon>
  );
};
export default IconBlackRibbon;
