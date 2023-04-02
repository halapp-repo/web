import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface UpdatingCoverProps {
  isUpdating: boolean;
  children: ReactNode;
}

const UpdatingCover = ({ isUpdating, children }: UpdatingCoverProps) => {
  return (
    <>
      {isUpdating && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1000,
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            display: 'flex'
          }}>
          <Box sx={{ flex: '1', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Stack spacing={2}>
              <Box
                sx={{
                  borderRadius: '8px',
                  width: '80px',
                  zIndex: 2000,
                  height: '80px',
                  backgroundColor: '#000000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex'
                }}>
                <Stack spacing={1} alignItems={'center'}>
                  <CircularProgress color="primary" />
                  <Typography variant="body2" fontWeight={'bold'} color="#ffffff">
                    Yükleniyor
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
      {children}
    </>
  );
};
export { UpdatingCover };
