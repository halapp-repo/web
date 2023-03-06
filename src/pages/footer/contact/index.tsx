import { WhatsAppOutlined } from '@ant-design/icons';
import { Box, Typography, Stack, Button, Link } from '@mui/material';
import Logo from '../../../components/logo/Logo';
import MainCard from '../../../components/MainCard';
import PageWrapper from '../../../components/PageWrapper';
import { Link as RouterLink } from 'react-router-dom';

const Contact = () => {
  return (
    <PageWrapper md={6} lg={4}>
      <MainCard>
        <Stack
          sx={{ minHeight: '300px', p: '30px' }}
          spacing={3}
          justifyItems="center"
          alignItems={'center'}>
          <Box>
            <Logo Size="large" />
          </Box>
          <Typography color="primary" variant="h3">
            {'Halapp İletişim Merkezi'}
          </Typography>
          <Typography sx={{ display: 'inline' }} variant="h5">
            {'7/24 '}
            <Link
              href="https://api.whatsapp.com/send?phone=905384503672"
              target="_blank"
              sx={{ display: 'inline-block', color: '#25D366' }}>
              <WhatsAppOutlined /> (0538) 450 36 72
            </Link>
            {' numaralı telefondan bizi arayabilir, dilediğiniz zaman '}
            <Button
              color="primary"
              sx={{ textTransform: 'none' }}
              href="mailto: info@halapp.io"
              component={Link}>
              <Typography color="primary" variant="h5">{`info@halapp.io`}</Typography>
            </Button>
            {' adresine email gönderebilir veya halapp hakkında merak ettikleriniz için '}
            <Button
              color="primary"
              sx={{ textTransform: 'none' }}
              to="/about"
              component={RouterLink}>
              <Typography color="primary" variant="h5">{`halapp.io/about`}</Typography>
            </Button>
            {' adresini ziyaret edebilirsiniz.'}
          </Typography>
        </Stack>
      </MainCard>
    </PageWrapper>
  );
};

export default Contact;
