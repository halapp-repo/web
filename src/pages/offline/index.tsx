import { Grid, Stack, Typography, Box } from '@mui/material';
import IconOffline from '../../components/icons/IconOffline';
import MainCard from '../../components/MainCard';

const Offline = () => {
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
              <Typography variant="h3" color="text.secondary">
                {'Bağlantı yok'}
              </Typography>
            </Box>
            <IconOffline Size={'x-large'} />
            <Stack spacing={1}>
              <Typography variant="h5">
                {
                  'Görünüşe göre herhangi bir ağa bağlantın yok. Ayarlarını gözden geçir ve tekrar dene.'
                }
              </Typography>
              <Typography variant="body1">{'Bunları deneyebilirsin'}</Typography>
              <ul>
                <li>{'Uçak modunu kapat.'}</li>
                <li>{'Wi-Fi veya Mobil verini aç.'}</li>
                <li>{'Sinyalleri gözden geçir.'}</li>
              </ul>
            </Stack>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Offline;
