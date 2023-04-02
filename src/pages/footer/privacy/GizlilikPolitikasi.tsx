import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Logo from '../../../components/logo/Logo';
import MainCard from '../../../components/MainCard';

const GizlilikPolitikasi = () => {
  return (
    <MainCard>
      <Stack sx={{ minHeight: '300px', p: '30px' }} spacing={3}>
        <Stack justifyItems="center" alignItems={'center'}>
          <Logo Size="small" />
        </Stack>
        <Typography color="primary" fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'GİZLİLİK POLİTİKASI'}
        </Typography>
        <Typography variant="body1">
          HALAPP olarak kişisel verilerinizin güvenliği ve gizliliği hususunda büyük hassasiyet
          duymaktayız. İşbu metin (Politika) Şirket olarak, hizmetlerimizden yararlanan kişiler
          dahil olmak üzere şirket ile temas eden tüm kişilere ait kişisel verileri 6698 sayılı
          Kişisel Verilerin Korunması Kanunu (“KVK Kanunu”)’na uygun olarak gizlilik politikamız
          hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          {`Gizlilik Politikamız`}
        </Typography>
        <ul>
          <li>
            Halapp tarafından kişisel verilerin korunması ve gizlilik hususunda azami düzeyde
            hassasiyet gösterilmektedir.
          </li>
          <li>
            Halapp hizmetlerinden faydalandığınız takdirde üyelik kaydınızı gerçekleştirmek ve
            sipariş yönetimi ile ürün ve hizmetleri sizlere ulaştırmak ile ödeme işlemlerini
            gerçekleştirmek kapsamında kişisel verileriniz toplanmaktadır. Ayrıca, müşterilerimize
            daha iyi hizmet verebilmek adına şikayet ve önerileriniz kapsamında ad soyad, iletişim
            bilgileri ile öneri şikayet bilgileriniz toplanmaktadır.
          </li>
          <li>
            Kişisel verileriniz, <Link to="/privacy#aydinlatma-metni"> Aydınlatma Metni”nde</Link>{' '}
            yer alan amaçlara dayanarak üçüncü kişilere aktarılabilir. Bu kapsamda kişisel
            verileriniz, iş ortaklarımız ve ürün/hizmet tedariki kapsamında destek alınan
            tedarikçiler ve kuryeler ile paylaşılabilecektir. Bununla birlikte, yasal
            yükümlülüklerimizi yerine getirebilmek için bilgilerinizi paylaşmamız talep edildiğinde,
            bilgileriniz yetkili kişi, kurum ve kuruluşlar ile de paylaşılabilecektir.
          </li>
          <li>
            İşlenen verilerinizin işleme amaçları ile kişisel verilerinizin işlenmesi süreçleri
            kapsamında detaylı bilgi almak için “
            <Link to="/privacy#aydinlatma-metni">Aydınlatma Metni</Link>” ve “
            <Link to="/privacy#kisisel-verilerin-korunmasi-politikasi">
              Kişisel Verilerin Korunması Politikası
            </Link>
            ” nı inceleyebilirsiniz.
          </li>
          <li>
            İşlenen verilerinizin aktarılması hususunda alıcı gruplar ile gizlilik şartımız
            sözleşmelerimizde de en kapsayıcı hali ile bulunmaktadır.
          </li>
          <li>
            Halapp bünyesinde toplanan talepler, yapılan araştırma ve geliştirme sonuçları dahil
            olmak üzere şirketimiz istatistiki verileri çözüm ortakları ile paylaşılmakta ve
            gerektiği hallerde iletilen taleplerin yerine getirilebilmesi için çözüm ortaklarımız
            ile amaç ile bağlı olmak kaydı ile daha ayrıntılı veriler paylaşılabilmektedir. Bu husus
            hiçbir şekilde gizlilik politikamızın dışında bir eylem değildir.
          </li>
          <li>
            Tarafınızdan temin edilen kişisel bilgileri (ad, soyad, telefon numarası, e-posta
            adresi, vb.) genel kullanıma açık olmayan güvenli bir ortamda saklanmakta ve sadece
            şirket bünyesinde kullanılmaktadır.
          </li>
          <li>
            Koordineli çalıştığımız elemanlarımız ile KVKK kapsamında işbirliği protokolü yapılarak
            gizlilik taahhütleri alınmaktadır. Bu kişilere KVKK konusunda ihtiyaca göre eğitim
            verilmektedir.
          </li>
          <li>
            Yasal ve sözleşmesel yükümlülük bulunmadığı ve İlgili kişilerin aksi bir talimatı
            olmadığı sürece, üçüncü şahıslarla kesinlikle paylaşılmamakta, hiçbir şekilde ticari
            amaçla kullanılmamaktadır.
          </li>
          <li>
            Halapp, veri sorumlusu olarak; şifreleme, erişim logları, log kayıtları, veri maskeleme,
            güvenlik duvarı ve anahtar yönetimi teknik tedbirlerini almakta ve uygulamaktadır.
          </li>
          <li>
            İnternet sitemiz &#39;SSL&#39; sistemi ile donatılmıştır. Bu kapsamda iletişim kurmak
            için girdiğiniz bilgiler internetteki diğer kişiler tarafından görüntülenemez. Bu
            koruma, e- posta gibi yollarla gönderilen bilgiler için etkili değildir. İnternet
            sitemizde tutulan bilgiler sadece yasal düzenlemeler çerçevesinde yalnızca gerekli
            yetkiler çerçevesinde açıklanır. İnternet sitesinden reklam, banner, içerik maksatlı
            veya başka bir maksat ile geçilen diğer internet sitelerinin bilgi kullanımı, etik
            ilkeleri, gizlilik prensipleri, nitelik ve servis kalitesi ile bu sitelerde oluşabilecek
            herhangi bir maddi ve/veya manevi zarardan Halapp sorumlu değildir.
          </li>
          <li>
            Tarafımızca sunulan hizmetlerden yararlandığınız müddetçe kişisel verileriniz
            işlenebilecek ve verilerinizin doğruluğunu ve güncelliğini sağlamak amacıyla
            gerektiğinde size yapılan bilgilendirme akabinde güncellenebilecektir.
          </li>
        </ul>
      </Stack>
    </MainCard>
  );
};

export { GizlilikPolitikasi };
