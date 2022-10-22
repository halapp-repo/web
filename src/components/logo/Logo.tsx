import { SvgIcon } from '@mui/material';
import { ReactComponent as LogoContent } from './logo.svg';

type LogoSize = 'small' | 'medium' | 'large' | 'x-large';

interface LogoProps {
  Size?: LogoSize;
}

const Logo = ({ Size }: LogoProps) => {
  let logoSize = '2em';
  switch (Size) {
    case 'small':
      logoSize = '2em';
      break;
    case 'medium':
      logoSize = '4em';
      break;
    case 'large':
      logoSize = '6em';
      break;
    case 'x-large':
      logoSize = '8em';
      break;
    default:
      logoSize = '2em';
      break;
  }

  return (
    <SvgIcon sx={{ display: 'flex', width: logoSize, height: logoSize, mr: 1 }}>
      <LogoContent />
    </SvgIcon>
  );
};
export default Logo;
