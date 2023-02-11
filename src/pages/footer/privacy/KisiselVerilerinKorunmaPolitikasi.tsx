import { Typography, Stack } from '@mui/material';
import Logo from '../../../components/logo/Logo';
import MainCard from '../../../components/MainCard';
import { Link } from 'react-router-dom';

const KisiselVerilerinKorunmaPolitikasi = () => {
  return (
    <MainCard>
      <Stack sx={{ minHeight: '300px', p: '30px' }} spacing={3}>
        <Stack justifyItems="center" alignItems={'center'}>
          <Logo Size="small" />
        </Stack>
        <Typography color="primary" fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'KİŞİSEL VERİLERİN KORUNMASI POLİTİKASI'}
        </Typography>
        <Typography variant="body1">
          İşbu politika ile HALAPP TOPTAN TEDARİK VE YAZILIM TİCARET LİMİTED ŞİRKETİ (“Şirket”)
          tarafından kişisel verilerin korunması ve işlenmesinde benimsenen ilkeler ile kişisel
          verilerinizin hangi amaçlarla işlendiği, kişisel verilerinizin toplanma yöntemi ile hukuki
          amacı, kişisel verilerinizi aktarılmasına ilişki bilgi verilmektedir.
        </Typography>
        <Typography fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'KİŞİSEL VERİLERİN TOPLAMA YÖNTEMİ, İŞLENMESİ İLE HUKUKİ SEBEPLERİ'}
        </Typography>
        <Typography fontWeight={'bold'} variant="h6">
          {'KULLANICILARA İLİŞKİN KİŞİSEL VERİLER'}
        </Typography>
        <Typography variant="body1">
          Halapp olarak, kişisel verileriniz işbu metinde belirtilen amaçlar ve işleme şartları
          doğrultusunda işlenebilmektedir. İşlemeye konu kişisel veriler şunlardır:
        </Typography>
        <ol type="a">
          <li>
            <b>Kimlik Verileri</b>
          </li>
          Ad, soyad.
          <br />
          <li>
            <b>İletişim Verileri</b>
          </li>
          Telefon numarası, e-posta adresi, adres bilgisi, şirket içi iletişim bilgileri (şirket
          telefon numarası, dâhili telefon numarası, kurumsal e-posta adresi, kayıtlı e-posta
          adresi).
          <br />
          <li>
            <b>Ödeme Bilgileri</b>
          </li>
          Ücret ve detayları, borç bilgileri.
          <br />
          <li>
            <b>Müşteri İşlem Verileri</b>
          </li>
          Alışveriş ve sipariş geçmişi, sipariş bilgileri, internet sitesi kullanım verileri,
          e-posta üzerinden tarafımıza gönderilen yorum ve değerlendirme bilgileri.
          <br />
          <li>
            <b>Lokasyon Bilgileri</b>
          </li>
          Lokasyon bilgileri otomatik olarak tespit edilmeyecek olup, manuel olarak tarafınızca
          yazılmış konum bilgisi alınacaktır.
          <br />
          <li>
            <b>Diğer Veriler</b>
          </li>
          Şirket vergi kimlik numarası, şirket ismi, Fatura-Senet-Çek Bilgileri, Sipariş Bilgisi,
          alışveriş geçmişi bilgileri, ip adres bilgileri, internet sitesi giriş - çıkış kayıtları,
          talep-şikayet bilgileri.
          <br />
        </ol>
        <Typography fontWeight={'bold'} variant="h6">
          {'KİŞİSEL VERİLERİN İŞLENME AMACI'}
        </Typography>
        <Typography variant="body1">
          KVKK’nun 10. maddesi ve Tebliğ’in 5. maddesi kapsamında KVKK’nun 4. maddesinde belirtilen
          işleme şartlarına uygun olarak kullanıcıların kişisel verileri{' '}
          <Link to="/privacy#aydinlatma-metni">Aydınlatma Metninde</Link> belirtilen amaçlar ile
          işlenebilmektedir.
        </Typography>
        <Typography fontWeight={'bold'} variant="h6">
          {'KİŞİSEL VERİ TOPLAMANIN YÖNTEMİ VE HUKUKİ SEBEBİ'}
        </Typography>
        <Typography variant="body1">
          Kişisel veriler, hukuki ilişki kurulması sırasında doğrudan ilgili kişiden, üçüncü
          kişilerden ve yasal mercilerden elde edilebilecektir. Bu kapsamda kullanıcı sözleşmesinin
          gereklilikleri, elektronik posta, gibi araçlar üzerinden, Şirketimiz ile yapılan yazılı
          veya sözlü iletişim kanalları aracılığıyla sözlü, yazılı veya elektronik ortamda kişisel
          veriler toplanmaktadır.
        </Typography>
        <Typography variant="body1">
          KVKK’nın 5. maddesinde yer alan hüküm uyarınca kişisel veriler ilgili kişinin açık rızası
          olmadan işlenemez. Kanun istisna olarak açık rıza aranmayacak halleri belirtmiştir.
          Kanunda açık hüküm bulunması, bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya
          ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli
          olması, şirketin hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması, İlgili
          kişinin kendisi tarafından alenileştirilmiş olması, Bir hakkın tesisi, kullanılması veya
          korunması için veri işlemenin zorunlu olması, İlgili kişinin temel hak ve özgürlüklerine
          zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin
          zorunlu olması durumunda açık rıza aranmaksızın kişisel veriler şirketimiz tarafından
          işlenebilecektir.
        </Typography>
        <Typography variant="body1">
          HALAPP’ın faaliyetlerini sürdürebilmesi için KVKK’nın 5 ve 6. maddelerinde belirtilen
          kişisel verileri işleme şartları ve amaçları kapsamında ve ilgili sair mevzuat tarafından
          öngörülen esas ve usuller doğrultusunda belirtilen amaçların sağlanması ve hukuki
          yükümlülüklerin yerine getirilebilmesi için yukarıda belirtilen hukuki sebeplerle
          işlenmektedir.
        </Typography>
        <Typography variant="body1">
          Bu kapsamda, internet sitesinde elde edilen ad, soyad, iletişim bilgileri, hesap
          bilgileri, ödeme bilgileri, müşteri işlem bilgileri verileriniz kişisel veri işlemenin
          kanunlarda açıkça öngörülmesi ad, soyad, iletişim bilgileri, hesap bilgileri, ödeme
          bilgileri, müşteri işlem bilgileri, lokasyon verileriniz Halapp ile kurulan sözleşmenin
          kurulması ve ifası için gerekli olması, kişisel verilerin hukuki yükümlülüklerimizi yerine
          getirebilmek için işlenmesi ile meşru menfaatlerimiz için zorunlu olması sebepleriyle
          otomatik yollarla internet sitesi aracılığı ile işenmektedir.
        </Typography>
        <Typography fontWeight={'bold'} variant="h6">
          {'KİŞİSEL VERİLERİN KİMLERE VE HANGİ AMAÇLA AKTARILABİLECEĞİ'}
        </Typography>
        <Typography variant="body1">
          Kullanıcıların kişisel verileri, Kanun’un 8. ve 9. maddesinde belirtilen veri aktarma ve
          işleme şartları ile yukarıda sayılan amaçların gerçekleştirilmesini sağlamak amacı ile
          mevzuatta belirlenen güvenlik ve gizlilik esasları uyarınca yeterli ve etkili önlemler
          alınmak kaydıyla; tedarikçilerle, hissedarlarla, kuryelerle, yetkili satıcılarla, hizmet
          alınan özel hukuk kişileriyle (denetim, hukuk vb. konularda), bağımsız denetim
          kuruluşlarıyla, finans kuruluşlarıyla, direkt ve dolaylı iştirakler başta olmak üzere yurt
          içindeki ve yurt dışındaki iş ortaklarıyla, yurtiçinde ve yurtdışında bulunan depolama,
          arşivleme, bilişim teknolojileri desteği alınan firmalarla (sunucu, hosting, program,
          bulut bilişim), hukuken yetkili kamu kurumları ile paylaşılabilecek ve aktarılabilecektir.
        </Typography>
        <Typography fontWeight={'bold'} variant="h6">
          {'KİŞİSEL VERİLERİN SAKLANMA SÜRESİ'}
        </Typography>
        <Typography variant="body1">
          KVKK hükümlerine uygun olarak, işbu “
          <Link to="/privacy#aydinlatma-metni">
            Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni
          </Link>
          ” nde belirtilen amaçlarla işlenmiş olan kişisel verileriniz, KVKK madde 7/f.1.’e göre
          işlenmesi gerektiren amaç ortadan kalktığında ve/veya mevzuat uyarınca verilerinizi
          işlememiz için zorunlu kılındığımız zaman aşımı süreleri dolduğunda, Kişisel Verileri
          Saklama ve İmha Politikası göz önüne alınarak kişisel verileriniz tarafımızca silinecek,
          yok edilecek veya anonimleştirilerek kullanılmaya devam edilecektir.
        </Typography>
        <Typography fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'KİŞİSEL VERİLERİN İŞLENMESİNE YÖNELİK HUKUKİ YÜKÜMLÜLÜKLERİMİZ'}
        </Typography>
        <Typography variant="body1">
          HALAPP olarak veri sorumlusu sıfatıyla KVKK’dan doğan hukuki yükümlülüklerimizi işbu
          politik ile sizlere bildirmekteyiz.
        </Typography>
        <ul>
          <li>
            <b>Aydınlatma Yükümlülüğü</b>
          </li>
          Halapp olarak kişisel verilerinizi işleme süreci kapsamında Aydınlatma Yükümlülüğünün
          Yerine Getirilmesine Uyulacak Usul ve Esaslar Hakkında Tebliğ’e uygun olarak, aydınlatma
          yükümlülüğümüzü yerine getirmekteyiz. Aydınlatma yükümlülüğümüzü; Tebliğ’e uygun olarak;
          kişisel verilerinizin elde etme amaçları ve yöntemi ile hukuki sebepleri, saklama
          süreleri, ilgili kişi olarak sizlerin KVKK’dan doğan haklarınız, veri sorumlusu olarak
          bilgilerimiz kapsamında “<Link to="/privacy#aydinlatma-metni">Aydınlatma Metni</Link>” ile
          sizlere sunmaktayız.
          <br />
          <li>
            <b>Kişisel Verilerin Güvenliğini Sağlama Yükümlülüğü</b>
          </li>
          Halapp olarak, kişisel verilerinizin hukuka aykırı olarak işlenmesini önlemek, kişisel
          verilerinize hukuka aykırı olarak erişilmesini önlemek ve kişisel verilerinizin hukuka
          uygun olarak muhafazasını sağlamak amacıyla gerekli tüm teknik ve idari tedbirleri
          almaktayız. Ayrıca, kişisel verilerinizin silinmesi, yok edilmesi ve anonimleştirilmesi
          hususunda KVKK’nın öngördüğü yükümlülükleri yerine getirerek, kanuni süreler sonunda
          gerekli işlemleri yapmaktayız. , KVKK madde 7/f.1.’e göre işlenmesi gerektiren amaç
          ortadan kalktığında ve/veya mevzuat uyarınca verilerinizi işlememiz için zorunlu
          kılındığımız zaman aşımı süreleri dolduğunda, Kişisel Verileri Saklama ve İmha Politikası
          göz önüne alınarak kişisel verileriniz tarafımızca silinecek, yok edilecek veya
          anonimleştirilerek kullanılmaya devam edilecektir.
          <br />
          <li>
            <b>İlgili Kişi Başvurularını Cevaplama Yükümlülüğü</b>
          </li>
          Halapp olarak ilgili kişilerin tüm talep ve başvurularının en kısa sürede çözüme
          kavuşturulması ve ilgili kişiye cevap verilmesini sağlamaktayız. Talepleriniz Şirket
          tarafından mümkün olan en kısa sürede ve her halde 30 (otuz) gün içerisinde
          değerlendirilerek sonuçlandırılacaktır.
          <br />
          <li>
            <b>Veri Sorumluları Sicili Bilgi Sistemine (VERBİS) Kayıt Yükümlülüğü</b>
          </li>
          Şirketimizin, KVKK’nın 16. maddesi ile Veri Sorumluları Sicili Hakkında Yönetmelik
          uyarınca Veri Sorumluları Sicili Bilgi Sistemine (“VERBİS”) kayıt yükümlülüğünü yerine
          getirmekteyiz. Şirketimizin veri işleme faaliyetleri kapsamında VERBİS kaydını güncel
          tutmakta ve veri işleme faaliyetlerimize ilişkin detayları kamuoyunun bilgisine
          sunmaktayız.
          <br />
          <li>
            <b>Kişisel Verileri Koruma Kurulu Kararlarını Yerine Getirme Yükümlülüğü</b>
          </li>
          Halapp olarak KVKK ile tebliğlere ve Kurul Kararlarına uyumu sağlamaya son derece
          hassasiyet göstermekteyiz. Bu kapsamda, tüm veri sorumluları için bağlayıcı olan ilke
          kararları ile Kurul kararların takip ederek tüm teknik ve idari tedbirleri uygulamak için
          gerekli işlemleri yapmaktayız.
          <br />
        </ul>
        <Typography fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'KİŞİSEL VERİLERİN KORUNMASI'}
        </Typography>
        <Typography variant="body1">
          Halapp, kişisel verilerinizin barındığı sistemleri ve veri tabanlarını, KVKK’nun 12.
          Maddesi gereği kişisel verilerin hukuka aykırı olarak işlenmesini önlemekle, yetkisiz
          kişilerin erişimlerini engellemekle; muhafazalarını sağlamak amacıyla hash, şifreleme,
          işlem kaydı, erişim yönetimi gibi yazılımsal tedbirleri ve fiziksel güvenlik önlemleri
          almakla mükelleftir. Kişisel verilerin yasal olmayan yollarla başkaları tarafından elde
          edilmesinin öğrenilmesi halinde durum derhal, yasal düzenlemeye uygun ve yazılı olarak
          Kişisel Verileri Koruma Kurulu’na bildirilecektir.
        </Typography>
        <Typography fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'KİŞİSEL VERİLERİN KORUNMASINA İLİŞKİN TEMEL İLKELER'}
        </Typography>
        <Typography variant="body1">
          Halapp olarak kişisel verilerin korunması ve işlenmesiyle ilgili olarak mevzuatta yer
          verilen genel ilkeler ile şartları karşılar ve kişisel verilerin Anayasa’ya ve KVK
          Kanunu’na uygun olarak işlenmesini sağlamak amacıyla aşağıda sıralanan ilkelere uygun
          hareket etmekteyiz.
        </Typography>
        <ul>
          <li>Kişisel Veri İşleme Faaliyetlerinin Hukuka Ve Dürüstlük Kuralına Uygun Olması</li>
          <br />
          <li>Kişisel Verilerin Doğru ve Gerektiğinde Güncel Olmasının Sağlanması</li>
          <br />
          <li>Kişisel Verilerin Belirli, Açık ve Meşru Amaçlarla İşlenmesi</li>
          <br />
          <li>İşlendikleri Amaçla Bağlantılı, Sınırlı ve Ölçülü Olma</li>
          <br />
          <li>
            İlgili Mevzuatta Öngörülen veya İşlendikleri Amaç İçin Gerekli Olan Süre Kadar Muhafaza
            Etme
          </li>
        </ul>
        <Typography fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'İLGİLİ KİŞİ OLARAK HAKLARINIZ VE KULLANIMI'}
        </Typography>
        <Typography variant="body1">
          İlgili kişi olarak, Kişisel Verilerin Korunması Kanunu uyarınca kişisel veri sahiplerine
          tanınan tüm haklardan yararlanabilirsiniz.
        </Typography>
        <Typography variant="body1">
          T.C. Anayasa’nın 20. maddesinde herkesin, kendisiyle ilgili kişisel veriler hakkında
          bilgilendirilme hakkına sahip olduğu, KVKK’nın 11. maddesi gereği, İlgili Kişi hakları
          arasında “bilgi talep etme” hakkının da bulunduğu düzenlenmiştir. Şirket bu kapsamda,
          talep ettiğiniz takdirde bilgileri tarafınıza sunacaktır.
        </Typography>
        <Typography variant="body1">
          Ayrıca KVKK kapsamında aşağıdaki haklara da sahipsiniz:
        </Typography>
        <ul>
          <li>Kişisel Veriler’inin işlenip işlenmediğini öğrenme,</li>
          <br />
          <li>Kişisel Veriler’i işlenmişse buna ilişkin bilgi talep etme,</li>
          <br />
          <li>
            Kişisel Veriler’inin işlenme amacını ve bunların amacına uygun kullanılıp
            kullanılmadığını öğrenme,
          </li>
          <br />
          <li>
            Yurt içinde veya yurt dışında Kişisel Veriler’inin aktarıldığı üçüncü kişileri bilme,
          </li>
          <br />
          <li>
            Kişisel Veriler’inin eksik veya yanlış işlenmiş olması halinde bunların düzetilmesini
            isteme,
          </li>
          <br />
          <li>
            KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde Kişisel Veriler’inin
            silinmesini/yok edilmesini ve bu kapsamda Kişisel Veriler’in aktarıldığı üçüncü kişilere
            bildirilmesini isteme,
          </li>
          <br />
          <li>
            İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle
            aleyhlerine bir sonucun ortaya çıkmasına itiraz etme,
          </li>
          <br />
          <li>
            Kişisel Veriler’inin KVKK’ya aykırı olarak işlenmesi sebebiyle zarara uğramaları halinde
            giderilmesini talep etme
          </li>
          <br />
        </ul>
        <Typography variant="body1">
          Kişisel veri sahipleri olarak bu haklarınıza ilişkin taleplerinizi tarafımıza{' '}
          <a href="mailto:info@halapp.io">info@halapp.io</a> adresini kullanarak iletebilirsiniz.
          Talepleriniz Şirket tarafından mümkün olan en kısa sürede ve her halde 30 (otuz) gün
          içerisinde değerlendirilerek sonuçlandırılacaktır.
        </Typography>
        <Typography fontWeight={'bold'} variant="h6">
          {'Politika güncelleme tarihi: 02/02/2023'}
        </Typography>
      </Stack>
    </MainCard>
  );
};

export { KisiselVerilerinKorunmaPolitikasi };
