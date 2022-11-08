import { forwardRef, ReactNode } from 'react';

// material-ui
import { Fade, Box, Grow } from '@mui/material';

// ==============================|| TRANSITIONS ||============================== //

interface Props {
  children: ReactNode;
  position?: 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom';
  type?: 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom';
}
export type Ref = HTMLDivElement;

// eslint-disable-next-line react/display-name
const Transitions = forwardRef<Ref, Props>(
  ({ children, position = 'top-left', type = 'grow', ...others }, ref) => {
    let positionSX = {
      transformOrigin: '0 0 0'
    };

    switch (position) {
      case 'top-right':
      case 'top':
      case 'bottom-left':
      case 'bottom-right':
      case 'bottom':
      case 'top-left':
      default:
        positionSX = {
          transformOrigin: '0 0 0'
        };
        break;
    }

    return (
      <Box ref={ref}>
        {type === 'grow' && (
          <Grow {...others}>
            <Box sx={positionSX}>{children}</Box>
          </Grow>
        )}
        {type === 'fade' && (
          <Fade
            {...others}
            timeout={{
              appear: 0,
              enter: 300,
              exit: 150
            }}>
            <Box sx={positionSX}>{children}</Box>
          </Fade>
        )}
      </Box>
    );
  }
);

export default Transitions;
