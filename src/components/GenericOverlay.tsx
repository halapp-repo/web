import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface GenericOverlayProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}
const GenericOverlay = ({ children, sx }: GenericOverlayProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: '1',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        display: 'flex',
        backgroundColor: '#fafafb',
        ...sx
      }}>
      {children}
    </Box>
  );
};
export { GenericOverlay };
