import { Box, Link, Stack, Typography } from '@mui/material';

import Logo from '../../../components/logo/Logo';
import LogoText from '../../../components/logo/LogoText';
import MainCard from '../../../components/MainCard';
import PageWrapper from '../../../components/PageWrapper';

const BilgiToplumuHizmetleri = () => {
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
            <Stack alignItems={'center'}>
              <LogoText />
            </Stack>
          </Box>
          <Typography color="primary" variant="h3">
            {'Bilgi Toplumu Hizmetleri'}
          </Typography>
          <Typography variant="h5">
            {'Detaylı bilgi için lütfen aşağıdaki bağlantıyı tıklayınız.'}
          </Typography>
          <Link
            href="https://e-sirket.mkk.com.tr/esir/Dashboard.jsp#/sirketbilgileri/"
            target="_blank"
            sx={{ display: 'inline-block' }}>
            {'Şirket bilgisi'}
          </Link>
        </Stack>
      </MainCard>
    </PageWrapper>
  );
};

export default BilgiToplumuHizmetleri;
