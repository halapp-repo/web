import { SvgIcon } from '@mui/material';
import { ReactComponent as LogoContent } from './logoText.svg';

type LogoSize = 'small' | 'medium' | 'large' | 'x-large';

interface LogoProps {
  Size?: LogoSize;
}

const LogoText = ({ Size }: LogoProps) => {
  let logoSize = '5em';
  switch (Size) {
    case 'small':
      logoSize = '2em';
      break;
    case 'medium':
      logoSize = '5em';
      break;
    case 'large':
      logoSize = '7em';
      break;
    case 'x-large':
      logoSize = '8em';
      break;
    default:
      logoSize = '5em';
      break;
  }
  return (
    <SvgIcon
      viewBox="0 0 200 49"
      preserveAspectRatio="xMidYMid meet"
      sx={{ display: 'flex', width: logoSize, height: 'auto' }}>
      <LogoContent />
    </SvgIcon>
  );
};
export default LogoText;
