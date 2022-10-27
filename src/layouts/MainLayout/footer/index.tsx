import { InstagramOutlined } from '@ant-design/icons';
import { Box, Grid, Typography, IconButton } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ minHeight: '50px', borderTop: '1px solid #f0f0f0' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            {'© 2022 HalApp'}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box>
            <Typography variant="body1" color="text.secondary">
              {`Esentepe, Kolektif House, Talatpaşa Cd. No: 5/1, 34394 Şişli/İstanbul`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              {`info@halapp.io`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            type="link"
            href="https://www.instagram.com/halapptoptan/"
            rel="noreferrer"
            LinkComponent={InstagramOutlined}
            target="_blank"
            onClick={() => window.open('https://www.instagram.com/halapptoptan/')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
