import { SvgIcon } from '@mui/material';
import { ReactComponent as LogoContent } from './logo.svg';

const Logo = () => (
  <SvgIcon sx={{ display: 'flex', width: '2em', height: '2em', mr: 1 }}>
    <LogoContent />
  </SvgIcon>
);
export default Logo;
