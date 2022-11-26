import { Button, Divider, Box, Typography, useMediaQuery, Theme } from '@mui/material';
import { useLocation } from 'react-router-dom';

const SummaryNCheckout = () => {
  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const location = useLocation();

  return (
    <>
      <Divider sx={{ marginBottom: '10px' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
        <Typography variant="body1">
          <strong>{'Toplam :'}</strong>
        </Typography>
        <Typography variant="body1">
          <strong>{'XXXXX'}</strong>
        </Typography>
      </Box>
      {(matchesMd || location.pathname !== '/dashboard') && (
        <Button sx={{ width: '100%', marginBottom: '5px' }} variant="outlined">
          {'Continue shopping'}
        </Button>
      )}
      <Button sx={{ width: '100%' }} variant="contained">
        {'Checkout'}
      </Button>
    </>
  );
};

export default SummaryNCheckout;
