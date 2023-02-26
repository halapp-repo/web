import { SvgIcon } from '@mui/material';
import { ReactComponent as LogoContent } from './logoText.svg';

const LogoText = () => {
  return (
    <SvgIcon
      viewBox="0 0 200 49"
      preserveAspectRatio="xMidYMid meet"
      sx={{ display: 'flex', width: '5em', height: 'auto' }}>
      <LogoContent />
    </SvgIcon>
  );
};
export default LogoText;
