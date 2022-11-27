import { SvgIcon } from '@mui/material';
import { ReactComponent as LogoContent } from './logoText.svg';

type LogoSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

interface LogoProps {
  Size?: LogoSize;
}

const LogoText = ({ Size }: LogoProps) => {
  let logoSize = '2em';
  switch (Size) {
    case 'x-small':
      logoSize = '1em';
      break;
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
    <SvgIcon
      viewBox="0 0 249 81.6"
      preserveAspectRatio="xMidYMid meet"
      sx={{ display: 'flex', width: logoSize, height: 'auto' }}>
      <LogoContent />
    </SvgIcon>
  );
};
export default LogoText;
