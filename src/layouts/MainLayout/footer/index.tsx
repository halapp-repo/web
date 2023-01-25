import { InstagramOutlined } from '@ant-design/icons';
import { Box, Grid, Typography, IconButton, Stack, Button, Divider } from '@mui/material';
import { useMemo } from 'react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const year = useMemo(() => moment().format('YYYY'), []);
  return (
    <Box sx={{ minHeight: '50px', borderTop: '1px solid #f0f0f0' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack
            direction={'row'}
            spacing={1}
            justifyContent="center"
            sx={{ alignItems: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {`© ${year} `}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {'halapp'}
            </Typography>
          </Stack>
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
          <Stack direction="row" justifyContent={'center'} alignItems="center">
            <Button
              color="primary"
              sx={{ textTransform: 'none' }}
              to={'/bilgi-toplumu-hizmetleri'}
              component={RouterLink}>
              <Typography variant="body2" color="text.secondary">
                {`bilgi toplumu hizmetleri`}
              </Typography>
            </Button>
            <Divider sx={{ color: 'text.secondary' }}>{'•'}</Divider>
            <Button
              color="primary"
              to={'/locations'}
              component={RouterLink}
              sx={{ textTransform: 'none' }}>
              <Typography variant="body2" color="text.secondary">
                {`lokasyon`}
              </Typography>
            </Button>
            <Divider sx={{ color: 'text.secondary' }}>{'•'}</Divider>
            <Button
              color="primary"
              to={'/contact'}
              component={RouterLink}
              sx={{ textTransform: 'none' }}>
              <Typography variant="body2" color="text.secondary">
                {`iletişim`}
              </Typography>
            </Button>
          </Stack>
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
