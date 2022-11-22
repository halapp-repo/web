import { SvgIcon } from '@mui/material';
import { ReactComponent as IconContent } from './iconCompany.svg';

type LogoSize = 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

interface LogoProps {
  Size?: LogoSize;
}

const IconCompany = ({ Size }: LogoProps) => {
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
    case 'xx-large':
      logoSize = '16em';
      break;
    default:
      logoSize = '2em';
      break;
  }

  return (
    <SvgIcon sx={{ display: 'flex', width: logoSize, height: logoSize, mr: 1 }}>
      <IconContent />
    </SvgIcon>
  );
};
export default IconCompany;
