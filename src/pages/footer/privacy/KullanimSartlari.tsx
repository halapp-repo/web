import { Typography, Stack } from '@mui/material';
import Logo from '../../../components/logo/Logo';
import MainCard from '../../../components/MainCard';
import { Link } from 'react-router-dom';

const KullanimSartlari = () => {
  return (
    <MainCard>
      <Stack sx={{ minHeight: '300px', p: '30px' }} spacing={3}>
        <Stack justifyItems="center" alignItems={'center'}>
          <Logo Size="small" />
        </Stack>
        <Typography color="primary" fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'KULLANIM ŞARTLARI'}
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 1. AMAÇ VE KONU
        </Typography>
        <Typography variant="body1">
          HALAPP web sitesi ve diğer yazılımlarını ve organize ettiği sistemleri kullanarak HALAPP
          kulanım şartlarını kabul ettiğiniz var sayılır. İşbu kullanım şartlarını kabul
          etmiyorsanız yahut kabul etmediğiniz hükümler mevcut ise HALAPP sistemlerini kullanmamanız
          gerekmektedir. İşbu kullanım şartları HALAPP tarafından kullanıcı olmak isteyen kişileri
          bilgilendirmek maksadıyla hazırlanmıştır. HALAPP bu şartlarda tek taraflı değişiklik yapma
          hakkını her daim saklı tutar.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 2. TANIMLAR
        </Typography>
        <Typography variant="body1">İşbu kullanım şartlarındaki;</Typography>
        <ol type="A">
          <li>
            <b>HALAPP:</b>
          </li>
          Halapp Toptan Tedarik ve Yazılım Ticaret Limited Şirketi’ni,
          <br />
          <li>
            <b>KULLANICI:</b>
          </li>
          Sitede bulunan ürünlere ilişkin sipariş talebi oluşturan, üye olsun olmasın bütün gerçek
          ve tüzel kişileri,
          <br />
          <li>
            <b>TARAF:</b>
          </li>
          İşbu kullanım şartlarıyla borç altına girmiş ve hak elde etmiş olan kişi/kurumu,
          <br />
          <li>
            <b>TARAFLAR:</b>
          </li>
          İşbu kullanım şartları ile hak elde eden ve borç altına giren bütün kişiler/kurumları,
          <br />
          <li>
            <b>KULLANIM KOŞULLARI:</b>
          </li>
          İnternet sitesinde bulunan seçenekler arasından, kullanıcı tarafından seçilen ve HALAPP
          tarafından kullanıcıya sunulan hizmet veya malları,
          <br />
          <li>
            <b>İLETİŞİM YÖNERGESI:</b>
          </li>
          <Link to="/">halapp.io</Link> web sitesindeki <Link to="/contact">İletişim</Link>{' '}
          sayfasındaki yönergeleri,
          <br />
          <li>
            <b>KİŞİSEL VERİLERİN KORUNMASI POLİTİKASI:</b>
          </li>
          HALAPP{' '}
          <Link to="/privacy#kisisel-verilerin-korunmasi-politikasi">
            Kişisel Veriler Politikasını,
          </Link>
          <br />
          <li>
            <b>KİŞİSEL VERİLER AYDINLATMA METNİ:</b>
          </li>
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verileri saklama, işleme
          ve aktarma şartlarına ilişkin <Link to="/privacy#aydinlatma-metni">aydınlatma metni</Link>{' '}
          ni,
          <br />
          <li>
            <b>GİZLİLİK POLİTİKASI:</b>
          </li>
          <Link to="/">halapp.io</Link> web sitesinde yer alan{' '}
          <Link to="/privacy#gizlilik-politikasi">gizlilik politikası</Link>nı
          <br />
          <li>
            <b>ÜÇÜNCÜ KİŞİ:</b>
          </li>
          HALAPP ve kullanıcı olmayan bütün gerçek ve tüzel kişileri,
          <br />
          <li>
            <b>GİZLİ BİLGİ:</b>
          </li>
          HALAPP’A ait kullanıcının kullanıcı olması sebebiyle vakıf olduğu yahut vakıf olmasının
          muhtemel olduğu her türden bilgi’yi, Gizli Bilgiye ilişkin kullanıcıların yükümlülükleri
          kullanım süresi ile sınırlı olmayıp; kullanımın her ne sebeple olursa olsun sonlanmasından
          sonra dahi geçerliliğini koruyacaktır. İşbu anlaşma kapsamında “gizli bilgi”; HALAPP’A ait
          patent, faydalı model, lisans ve telif hakları gibi bütün Fikri ve Sınai Mülkiyet Hakları
          ve mali hakları ile, ticari marka, ticari sır, her türlü iyileştirme fikri, icat, yöntem,
          iş ve her türlü yenilik dahil kendisinin yazdığı, bulduğu, geliştirdiği, yapmayı veya
          uygulamaya döktüğü ve bunlarla sınırlı olmaksızın, veri tabanı, bilgisayar programları ve
          bunların dokümanları, şifreleme teknikleri, prosesler, reklam ve pazarlama planları, ürün
          planları, teknik planlar, iş stratejileri, stratejik ittifaklar ve ortaklar, mali
          bilgiler, mühendislik verileri, ürün ve servislere ait veriler, her türlü yöntem ve
          prosesler, tahminler, personel bilgileri, müşteri listeleri, ticari sırlar, ürün tasarım
          kabiliyetleri, şartnameler, potansiyel ve gerçek müşterilerin kimliği, gizliliği haiz
          olmasa da her neviden paylaşılan bilgi yasal korumaya konu olamasa bile diğer her türlü
          yenilik ve tarafların aralarındaki ticari ilişki esnasında yazılı ya da sözlü yoldan
          doğrudan ve/veya dolaylı olarak öğrenecekleri tüm ticari, mali, teknik bilgiler, abonelik
          ve konuşma bilgileri tedarikçiler ve bir tarafın diğer tarafa temin ettiği her türlü
          doküman, malzeme, bilgi ve belgeler dahil, her türlü şifahi, yazılı, grafiksel veya makine
          veya bilgisayarlarda okunabilir bilgiyi kapsar. Gizli bilgi ve veriler, yazılı olarak
          gizli veya müseccel oldukları belirtilmese dahi gizli bilgi olarak kabul edilir.
          <br />
          <li>
            <b>KULLANIM KOŞULLARI:</b>
          </li>
          İşbu kullanım koşulları metninde yer alan tüm koşulları,
          <br />
        </ol>
        <Typography variant="body1">ifade etmektedir.</Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 3. ÜYE OLMA
        </Typography>
        <Typography variant="body1">
          Kullanıcılar, işbu internet sitesinde bulunan “Üye Ol” sekmesinde gerekli olan kısımları
          doldurarak, kullanıcının paylaştığı e-posta adresine gelen onaylaması akabinde şifresini
          girerek kayıt olma aşamalarını tamamlamış olacaktır. Kullanıcı kayıt olma aşamasında
          vermiş olduğu tüm bilgilerin kendisine ait, doğru ve güncel olduğunu kabul etmektedir.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 4. ÜRÜN FİYATLARI VE ÖDEME
        </Typography>
        <Typography variant="body1">
          İnternet sitemizde bulunan ürün fiyatları her zaman güncel olup, piyasadaki arz/talep
          dengesine uygun olarak anlık değişim göstermektedir. Kullanıcı siparişi verdikten sonra
          karşısına çıkacak olan ödeme sekmesinden sanal post/ kredi kartı ile ödeme işlemini
          tamamlayacaktır.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 5. SORUMLULUK VE HAKLAR
        </Typography>
        <Typography variant="body1">
          Kullanıcıların internet sitesine girmesi, sitedeki bilgilerin kullanımından kaynaklanan
          sözleşmenin ihlali, haksız fiil gibi doğabilecek doğrudan veya dolaylı, menfi veya müspet
          hiçbir zarardan HALAPP sorumlu tutulamaz.
        </Typography>
        <Typography variant="body1">
          HALAPP internet sitesinde bulunan her tür ürün, hizmet, kullanma koşulları ile sitede
          bulunan her türlü bilgiyi ihtara gerek olmaksızın değiştirme, siteyi yeniden organize
          etme, yayını durdurma hakkını saklı tutar. Değişiklikler sitede yayım anında yürürlüğe
          girer. Sitenin kullanımı ya da siteye giriş ile bu değişiklikler de kabul edilmiş sayılır.
        </Typography>
        <Typography variant="body1">
          HALAPP, herhangi bir eylemden kaynaklı olarak; işlemin kesintiye uğraması, hata, ihmal,
          kesinti, silinme, kayıp, işlemin veya iletişimin gecikmesi, bilgisayar virüsü, iletişim
          hatası, hırsızlık, imha veya izinsiz olarak kayıtlara girilmesi, değiştirilmesi veya
          kullanılması hususunda herhangi bir sorumluluk kabul etmemektedir.
        </Typography>
        <Typography variant="body1">
          Kullanıcılar, şikayet ve önerilerini internet sitesinde bulunan{' '}
          <Link to={'/contact'}>iletişim linki</Link> altındaki yönergelere uygun olarak HALAPP’a
          iletir. HALAPP mümkün olduğu en kısa sürede kullanıcıya dönüş yaparak kullanıcıların
          şikayet/önerileri üzerine alabileceği önlemleri ve çözümleri kullanıcıya sunar.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 6. KİŞİSEL VERİLERİN KORUNMASI
        </Typography>
        <Typography variant="body1">
          HALAPP kişisel verilerinizin korunmasına büyük hassasiyet göstermektedir. Kişisel
          verilerinize ilişkin metinlere aşağıda bulunan linkler aracılığı ile ulaşabilirsiniz.
        </Typography>
        <Typography variant="body1" fontWeight={'bold'}>
          <Link to="/privacy#aydinlatma-metni">Aydınlatma Metni</Link>
        </Typography>
        <Typography variant="body1" fontWeight={'bold'}>
          <Link to="/privacy#gizlilik-politikasi">Gizlilik Politikası</Link>
        </Typography>
        <Typography variant="body1" fontWeight={'bold'}>
          <Link to="/privacy#kisisel-verilerin-korunmasi-politikasi">
            Kişisel Verilerin Korunması Politikası
          </Link>
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 7. FİKRİ MÜLKİYET HAKLARI
        </Typography>
        <Typography variant="body1">
          HALAPP, İnternet sitesinde bulunan genel görünüm, dizayn, her türlü bilgi, resim,
          “halapp.io” alan adı, logo, yazılı, elektronik her türlü veri, uygulanan satış sistemi, iş
          metodu, iş modeli ve bu verilere benzer her türlü materyallerin ve bunlara ilişkin fikri
          ve sınai mülkiyet haklarının sahibi veya lisans sahibidir ve yasal koruma altındadır.
        </Typography>
        <Typography variant="body1">
          Internet sitesinde bulunan hiçbir Materyal; önceden izin alınmadan ve kaynak
          gösterilmeden, kod ve yazılım da dahil olmak üzere, değiştirilemez, kopyalanamaz,
          çoğaltılamaz, başka bir lisana çevrilemez, yeniden yayımlanamaz, başka bir bilgisayara
          yüklenemez, postalanamaz, iletilemez, sunulamaz ya da dağıtılamaz. Internet sitesinin
          bütünü veya bir kısmı başka bir internet sitesinde izinsiz olarak kullanılamaz. Aksine
          hareketler hukuki ve cezai sorumluluğu gerektirir. HALAPP, işbu kullanıcı koşullarında
          açıkça belirtilmeyen her türlü hakkını saklı tutar.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 8. REKABET YASAĞI
        </Typography>
        <Typography variant="body1">
          Kullanıcılar HALAPP web sitesini kullanarak hiçbir şekilde HALAPP ile rekabet etme
          anlamına gelecek eylemlerde bulunmayacaklarını, HALAPP sistemlerini fiziki ve veya
          elektronik pazar çalışması olarak kullanmayacağını, kullanım her ne şartla kesilirse
          kesilsin HALAPP ile aynı alanda faaliyet gösterecek şekilde ticaret yahut esnaflık
          yapmayacağını kabul ve beyan eder. Aksi taktirde kullanıcı, HALAPP’ın uğradığı doğmuş
          doğacak, menfi müspet, doğrudan dolaylı her türlü zararını HALAPP’IN ilk talebi ile derhal
          ve defaten karşılamakla yükümlüdür.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 9. SONA ERME
        </Typography>
        <Typography variant="body1">
          Kullanıcı, dilediği zaman hesabını silerek internet sitesini kullanmaya son verebilir.
          Buna karşılık, HALAPP’ın üyeliği belirli sebeplerle askıya alma veya çıkarma yetkisi
          saklıdır. Kullanıcı dilediği zaman üyeliğinin askıya alınmasını talep edebilir. Kullanıcı
          üyeliğini yeniden aktifleştirdiğinde sistemi kullanabilecektir. Üyelik askıya alındığında;
          üyelerin sisteme kayıtlı kart numaraları ve adresleri silinecektir.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 10. DEĞİŞİKLİKLER
        </Typography>
        <Typography variant="body1">
          HALAPP, tek taraflı olarak işbu Koşulları ve internet sitesindeki diğer metinleri site
          üzerinde ilan ederek güncelleyebilir ve değiştirebilir.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 11. MÜCBİR SEBEPLER
        </Typography>
        <Typography variant="body1">
          HALAPP’ın veya HALAPP’ın mal yahut hizmet aldığı tedarikçilerinin çalışma imkanlarını
          kısmen veya tamamen, geçici veya daimî olarak durduracak şekilde ve derecede meydana gelen
          doğal afetler, harp, seferberlik, yangın, infilak, grev ve lokavt, salgın hastalık, terör
          gibi tarafların kontrolü haricinde zuhur eden iletişim sorunları, altyapı ve internet
          arızaları, elektrik kesintisi ve kötü hava koşulları, halapp.io’nun gerekli bilgi
          güvenliği önlemleri almasına karşın web sitesine ve sisteme yapılan saldırılar da dahil ve
          fakat bunlarla sınırlı olmamak kaydıyla HALAPP’ın makul ve objektif kontrolü haricinde
          gelişen ve HALAPP’ın gerekli özeni göstermesine rağmen önleyemediği kaçınılamayacak haller
          mücbir sebep sayılır.
        </Typography>
        <Typography variant="body1">
          HALAPP, mücbir sebep gerektiren durumlarda hiçbir suretle sorumlu tutulamaz. HALAPP, işbu
          kullanıcı koşulları ile belirlenen edimlerinden herhangi birini geç veya eksik ifa etme
          veya ifa etmeme nedeniyle yükümlü değildir.
        </Typography>
        <Typography variant="body1">
          Mücbir sebep gerçekleşmesine istinaden, gecikme, eksik ifa etme veya ifa etmeme veya
          temerrüt addedilmeyecek veya bu durumlar için HALAPP’tan herhangi bir nam altında tazminat
          talep edilemeyecektir.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 12. UYGULANACAK HUKUK KURALLARI
        </Typography>
        <Typography variant="body1">
          İşbu Koşullar Türkiye Cumhuriyeti yasalarına tabidir. Taraflar arasındaki uyuşmazlıklarda
          İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 13. DELİL SÖZLEŞMESİ
        </Typography>
        <Typography variant="body1">
          Taraflar, Koşullar’dan doğabilecek her türlü ihtilafta HALAPP’ın resmi defter ve ticari
          kayıtlarıyla, veri tabanında ve sunucularında tuttuğu elektronik bilgilerin, bilgisayar ve
          ses kayıtlarının, delil teşkil edeceğini, bu maddenin Hukuk Muhakemeleri Kanunu’nun 193.
          maddesi anlamında delil sözleşmesi niteliğinde olduğunu kabul eder.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          MADDE 14. YÜRÜRLÜK
        </Typography>
        <Typography variant="body1">
          Kullanıcı, üyelik oluşturması ve kullanması esnasında işbu Koşullar’a tabi olacağını kabul
          eder.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          Son Güncelleme Tarihi: 02/02/2023
        </Typography>
      </Stack>
    </MainCard>
  );
};

export { KullanimSartlari };
