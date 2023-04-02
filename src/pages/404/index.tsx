import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Icon404 from '../../components/icons/Icon404';
import MainCard from '../../components/MainCard';

const NotFound = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={4} justifyContent="center">
        <MainCard>
          <Stack
            direction={'column'}
            spacing={2}
            justifyContent="center"
            alignItems={'center'}
            sx={{ padding: '10px 20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h3" color="text.secondary" sx={{ fontSize: '8em' }}>
                {'404'}
              </Typography>
            </Box>
            <Button component={Link} to={`/dashboard`}>
              <Icon404 Size={'x-large'} />
            </Button>
            <Typography variant="h4">{'Hay aksi, burada görülecek bir şey yok. 😔'}</Typography>
            <Typography variant="body1">
              {
                'Üzgünüz, aradığınız sayfayı bulamadık ya da sayfa artık mevcut değil. Kırık kasanın üstüne basarak tamir edebilir ve ana sayfaya geri dönebilirsin.'
              }
            </Typography>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default NotFound;
