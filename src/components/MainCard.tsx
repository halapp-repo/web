import { forwardRef, ReactNode } from 'react';
import { Card, CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
  children: ReactNode;
  sx?: object;
  title?: string;
}

export type Ref = HTMLDivElement;

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

// eslint-disable-next-line react/display-name
const MainCard = forwardRef<Ref, Props>((props, ref) => {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      ref={ref}
      sx={{
        ...props.sx,
        border: '1px solid',
        borderRadius: 2,
        borderColor: theme.palette.grey[300],
        boxShadow: 'inherit',
        ':hover': {
          boxShadow: 'inherit'
        },
        '& pre': {
          m: 0,
          p: '16px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem'
        }
      }}>
      {props.title && (
        <CardHeader
          sx={headerSX}
          titleTypographyProps={{ variant: 'subtitle1' }}
          title={props.title}
        />
      )}
      {props.children}
    </Card>
  );
});

export default MainCard;
