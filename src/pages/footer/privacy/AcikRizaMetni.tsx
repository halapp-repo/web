import { Typography, Stack } from '@mui/material';
import Logo from '../../../components/logo/Logo';
import MainCard from '../../../components/MainCard';
import { Link } from 'react-router-dom';

const AcikRizaMetni = () => {
  return (
    <MainCard>
      <Stack sx={{ minHeight: '300px', p: '30px' }} spacing={3}>
        <Stack justifyItems="center" alignItems={'center'}>
          <Logo Size="small" />
        </Stack>
        <Typography color="primary" fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'HALAPP AÇIK RIZA METNİ'}
        </Typography>
        <Typography variant="body1">
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, HALAPP TOPTAN TEDARİK VE
          YAZILIM TİCARET LİMİTED ŞİRKETİ sağlamış olduğum adım, soyadım ve e-posta adresim ile
          lokasyon bilgilerimin KVKK’da öngörülen temel ilkelere uygun olarak bilgilendirme,
          pazarlama, iş ve ürün geliştirme, maksatları ile işlenmesine; yurt içi ve yurt dışında
          yapılacak işin gereğince aktarılmasına, yurtdışında dahi olsa internet sunucuları üzerinde
          gerçekleşecek haberleşmeler kapsamında işlenebileceğine ve bu işlenme amaçlarıyla uygun
          süre zarfında fiziksel veya elektronik ortamda güvenli bir şekilde saklanmasına, ayrıca
          şirketinizin yasal yükümlülükleri kapsamında ilgili kurum ve kuruluşlarla
          paylaşılabileceğine peşinen izin verdiğimi ve işbu Kişisel Verilerin Korunmasına İlişkin
          Veri Sahibi’nin <Link to="/privacy#aydinlatma-metni">Aydınlatma metni</Link> ve Açık Rıza
          Metni’ni (“Açık Rıza Metni”) okuduğumu anladığımı ve kabul ettiğimi kabul, beyan ve
          taahhüt ederim.
        </Typography>
      </Stack>
    </MainCard>
  );
};

export { AcikRizaMetni };
