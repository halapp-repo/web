import { Stack, Typography } from '@mui/material';

import Logo from '../../../components/logo/Logo';
import MainCard from '../../../components/MainCard';

const AydinlatmaMetni = () => {
  return (
    <MainCard>
      <Stack sx={{ minHeight: '300px', p: '30px' }} spacing={3}>
        <Stack justifyItems="center" alignItems={'center'}>
          <Logo Size="small" />
        </Stack>
        <Typography color="primary" fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
          {'AYDINLATMA METNİ'}
        </Typography>
        <Typography variant="body1">
          HALAPP TOPTAN TEDARİK VE YAZILIM TİCARET LİMİTED ŞİRKETİ (HALAPP) olarak, 6698 Sayılı
          Kişisel Verilerin Korunması Kanunu (KVKK) çerçevesinde veri sorumlusu sıfatıyla
          sorumluyuz. Bu sebeple Halapp tarafından yönetilen “
          <a href="https://halapp.io">https://halapp.io</a>” internet sitesi vasıtasıyla kişisel
          verilerinizin işlenmesi kapsamında sizleri bilgilendirmekteyiz. HALAPP olarak ürün ve
          hizmetlerin sizlere sunulması için belirli kişisel verilerin işlenmesine ihtiyaç
          duyuyoruz. Kişisel verilerin özenle işlenmesinin gerekliliğine inanarak, bu verilerin
          gizliliğinin ve güvenliğinin korunması için gerekli tedbirleri almanın sorumluluğunun
          farkındayız.
        </Typography>
        <Typography variant="body1">
          Veri Sorumlusu; HALAPP TOPTAN TEDARİK VE YAZILIM TİCARET LİMİTED ŞİRKETİ (Tel:
          05308678375, Web sitesi: https://halapp.io/, E-mail: info@halapp.io, Mersis No:
          0455107114700001) tarafından, 6698 Sayılı Kişisel Verilerin Korunması Kanun’u (Bundan
          sonra “KVKK” olarak ifade edilecektir.) ile Aydınlatma Yükümlülüğünün Yerine
          Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ (Bundan sonra “Tebliğ” olarak
          belirtilecektir.) uyarınca müşterilerin şirketimiz ile ilişkilerinde kişisel verilerinin
          korunmasında izlenecek usul ve esaslar hakkında bilgilendirme amacıyla işbu aydınlatma
          metni hazırlanmıştır.
        </Typography>
        <Typography variant="body1">
          <b>KVKK madde 10;</b> “Kişisel verilerin elde edilmesi sırasında veri sorumlusu veya
          yetkilendirdiği kişi, ilgili kişilere; Veri sorumlusunun ve varsa temsilcisinin kimliği,
          Kişisel verilerin hangi amaçla işleneceği, İşlenen kişisel verilerin kimlere ve hangi
          amaçla aktarılabileceği, Kişisel veri toplamanın yöntemi ve hukuki sebebi, 11 inci maddede
          sayılan diğer hakları, konusunda bilgi vermekle yükümlüdür.”
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          {`KVKK’DA YER ALAN TEMEL TANIMLAR`}
        </Typography>
        <table
          border={1}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            borderCollapse: 'collapse'
          }}>
          <tbody>
            <tr>
              <td>
                <b>Kişisel Veri</b>
              </td>
              <td>
                Kimliği belirli veya belirlenebilir ger&ccedil;ek kişiye ilişkin her t&uuml;rl&uuml;
                bilgidir.
              </td>
            </tr>
            <tr>
              <td>
                <b>Kişisel Verilerin İşlenmesi</b>
              </td>
              <td>
                Kişisel verilerin tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt
                sisteminin par&ccedil;ası olmak kaydıyla otomatik olmayan yollarla elde edilmesi,
                kaydedilmesi, depolanması, muhafaza edilmesi, değiştirilmesi, yeniden
                d&uuml;zenlenmesi, a&ccedil;ıklanması, aktarılması, devralınması, elde edilebilir
                h&acirc;le getirilmesi, sınıflandırılması ya da kullanılmasının engellenmesi gibi
                veriler &uuml;zerinde ger&ccedil;ekleştirilen her t&uuml;rl&uuml; işlemdir.
              </td>
            </tr>
            <tr>
              <td>
                <b>Veri Sorumlusu</b>
              </td>
              <td>
                Kişisel verilerin işleme ama&ccedil;larını ve vasıtalarını belirleyen, veri kayıt
                sisteminin kurulmasından ve y&ouml;netilmesinden sorumlu olan ger&ccedil;ek ve
                t&uuml;zel kişidir. İşbu metin kapsamında veri sorumlusu, HALAPP TOPTAN TEDARİK VE
                YAZILIM TİCARET LİMİTED ŞİRKETİ&rsquo; dir.
              </td>
            </tr>
            <tr>
              <td>
                <b>Veri kayıt sistemi (VERBİS)</b>
              </td>
              <td>
                Kişisel verilerin belirli kriterlere g&ouml;re yapılandırılarak işlendiği kayıt
                sistemidir.
              </td>
            </tr>
            <tr>
              <td>
                <b>A&ccedil;ık Rıza</b>
              </td>
              <td>
                <p>
                  Belirli bir konuya ilişkin, bilgilendirilmeye dayanan ve &ouml;zg&uuml;r iradeyle
                  a&ccedil;ıklanan rızadır.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <b>Kurul</b>
              </td>
              <td>Kişisel Verileri Koruma Kurulu&rsquo;nu ifade etmektedir.</td>
            </tr>
          </tbody>
        </table>
        <Typography variant="h6" fontWeight={'bold'}>
          {`MÜŞTERİLERE İLİŞKİN KİŞİSEL VERİLER`}
        </Typography>
        <Typography variant="body1">
          HALAPP olarak, kişisel verileriniz işbu metinde belirtilen amaçlar ve işleme şartları
          doğrultusunda işlenebilmektedir. İşlemeye konu kişisel veriler şunlardır:
        </Typography>
        <ol type="a">
          <li>
            <Typography variant="h6" fontWeight={'bold'}>
              {`Kimlik Verileri`}
            </Typography>
          </li>
          <Typography variant="body1">Ad, soyad.</Typography>
          <br />
          <li>
            <Typography variant="h6" fontWeight={'bold'}>
              {`İletişim Verileri`}
            </Typography>
          </li>
          <Typography variant="body1">
            Telefon numarası, e-posta adresi, adres bilgisi, şirket içi iletişim bilgileri (şirket
            telefon numarası, dâhili telefon numarası, kurumsal e-posta adresi, kayıtlı e-posta
            adresi).
          </Typography>
          <br />
          <li>
            <Typography variant="h6" fontWeight={'bold'}>
              {`Ödeme Bilgileri`}
            </Typography>
          </li>
          <Typography variant="body1">Ücret ve detayları, borç bilgileri.</Typography>
          <br />
          <li>
            <Typography variant="h6" fontWeight={'bold'}>
              {`Müşteri İşlem Verileri`}
            </Typography>
          </li>
          <Typography variant="body1">
            Alışveriş ve sipariş geçmişi, sipariş bilgileri, internet sitesi kullanım verileri,
            e-posta üzerinden tarafımıza gönderilen yorum ve değerlendirme bilgileri.
          </Typography>
          <br />
          <li>
            <Typography variant="h6" fontWeight={'bold'}>
              {`Lokasyon Bilgileri`}
            </Typography>
          </li>
          <Typography variant="body1">
            Lokasyon bilgileri otomatik olarak tespit edilmeyecek olup, manuel olarak tarafınızca
            yazılmış konum bilgisi alınacaktır.
          </Typography>
          <br />
          <li>
            <Typography variant="h6" fontWeight={'bold'}>
              {`Diğer Veriler`}
            </Typography>
          </li>
          <Typography variant="body1">
            Şirket vergi kimlik numarası, şirket ismi, Fatura-Senet-Çek Bilgileri, Sipariş Bilgisi,
            alışveriş geçmişi bilgileri, ip adres bilgileri, internet sitesi giriş - çıkış
            kayıtları, talep-şikayet bilgileri.
          </Typography>
          <br />
        </ol>
        <Typography variant="h6" fontWeight={'bold'}>
          {`KİŞİSEL VERİLERİ İŞLEME AMACI`}
        </Typography>
        <Typography variant="body1">
          KVKK’nun 10. maddesi ve Tebliğ’in 5. maddesi kapsamında KVKK’nun 4. maddesinde belirtilen
          işleme şartlarına uygun olarak müşterilerin kişisel verileri şu amaçlarla
          işlenebilmektedir:
        </Typography>
        <ul>
          <li>Hizmet sözleşmesine bağlı olarak; hizmet yükümlülüklerinin yerine getirilmesi.</li>
          <li>
            İnternet sitesi üzerinden verilen siparişlere ilişkin sözleşme ve satış süreçlerinin
            yürütülmesi.
          </li>
          <li>Sipariş işlemi ile ödeme sürecinin yürütülmesi ve fatura düzenlenmesi.</li>
          <li>Sipariş tesliminde iletişim kurabilmek ve teslimatı gerçekleştirebilmek.</li>
          <li>Üyelik kaydınızın oluşturulması ve hesabınıza girişinizin sağlanması.</li>
          <li>
            Hizmet şartlarında meydana gelebilecek değişiklikler hakkında bilgilendirme yapılması,
          </li>
          <li>
            Elektronik (internet/mobil vs.) veya kağıt ortamında işleme dayanak olacak tüm kayıt ve
            belgelerin düzenlenmesi.
          </li>
          <li>
            Yasal yükümlülüklerin yerine getirilmesi ve yürürlükteki mevzuattan doğan hakların
            kullanılması.
          </li>
          <li>Yetkili kişi, kurum ve kuruluşlara bilgi verilmesi.</li>
          <li>Acil durum yönetimi süreçlerinin yürütülmesi.</li>
          <li>İletişim faaliyetlerinin yürütülmesi.</li>
          <li>Muhasebe ve finans işlerinin yürütülmesi.</li>
          <li>Saklama ve arşiv faaliyetlerinin yürütülmesi.</li>
          <li>
            Ürün ve hizmetlerin geliştirilebilmesi için analizlerin yapılması, raporlama ve
            denetleme faaliyetlerinin yürütülmesi.
          </li>
          <li>Şikâyet/önerilere yönelik bilgilendirme yapabilmek.</li>
        </ul>
        <Typography variant="h6" fontWeight={'bold'}>
          {`KİŞİSEL VERİ TOPLAMANIN YÖNTEMİ VE HUKUKİ SEBEBİ`}
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
          öngörülen esas ve usuller doğrultusunda işbu Aydınlatma Metni’nde belirtilen amaçların
          sağlanması ve hukuki yükümlülüklerin yerine getirilebilmesi için yukarıda belirtilen
          hukuki sebeplerle işlenmektedir.
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
        <Typography variant="h6" fontWeight={'bold'}>
          {`KİŞİSEL VERİLERİN KİMLERE VE HANGİ AMAÇLA AKTARILABİLECEĞİ`}
        </Typography>
        <Typography variant="body1">
          Müşterilerin kişisel verileri, Kanun’un 8. ve 9. maddesinde belirtilen veri aktarma ve
          işleme şartları ile yukarıda sayılan amaçların gerçekleştirilmesini sağlamak amacı ile
          mevzuatta belirlenen güvenlik ve gizlilik esasları uyarınca yeterli ve etkili önlemler
          alınmak kaydıyla; tedarikçilerle, hissedarlarla, kuryelerle, yetkili satıcılarla, hizmet
          alınan özel hukuk kişileriyle (denetim, hukuk vb. konularda), bağımsız denetim
          kuruluşlarıyla, finans kuruluşlarıyla, direkt ve dolaylı iştirakler başta olmak üzere yurt
          içindeki ve yurt dışındaki iş ortaklarıyla, yurtiçinde ve yurtdışında bulunan depolama,
          arşivleme, bilişim teknolojileri desteği alınan firmalarla (sunucu, hosting, program,
          bulut bilişim), hukuken yetkili kamu kurumları ile paylaşılabilecek ve aktarılabilecektir.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          {`KİŞİSEL VERİLERİN SAKLANMA SÜRESİ`}
        </Typography>
        <Typography variant="body1">
          KVKK hükümlerine uygun olarak, işbu “Kişisel Verilerin İşlenmesine İlişkin Aydınlatma
          Metni” nde belirtilen amaçlarla işlenmiş olan kişisel verileriniz, KVKK madde 7/f.1.’e
          göre işlenmesi gerektiren amaç ortadan kalktığında ve/veya mevzuat uyarınca verilerinizi
          işlememiz için zorunlu kılındığımız zaman aşımı süreleri dolduğunda, Kişisel Verileri
          Saklama ve İmha Politikası göz önüne alınarak kişisel verileriniz tarafımızca silinecek,
          yok edilecek veya anonimleştirilerek kullanılmaya devam edilecektir.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          {`İLGİLİ KİŞİNİN HAKLARI`}
        </Typography>
        <ul>
          <li>Kişisel Veriler’inin işlenip işlenmediğini öğrenme,</li>
          <li>Kişisel Veriler’i işlenmişse buna ilişkin bilgi talep etme,</li>
          <li>
            Kişisel Veriler’inin işlenme amacını ve bunların amacına uygun kullanılıp
            kullanılmadığını öğrenme,
          </li>
          <li>
            Yurt içinde veya yurt dışında Kişisel Veriler’inin aktarıldığı üçüncü kişileri bilme,
          </li>
          <li>
            Kişisel Veriler’inin eksik veya yanlış işlenmiş olması halinde bunların düzetilmesini
            isteme,
          </li>
          <li>
            KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde Kişisel Veriler’inin
            silinmesini/yok edilmesini ve bu kapsamda Kişisel Veriler’in aktarıldığı üçüncü kişilere
            bildirilmesini isteme,
          </li>
          <li>
            İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle
            aleyhlerine bir sonucun ortaya çıkmasına itiraz etme,
          </li>
          <li>
            Kişisel Veriler’inin KVKK’ya aykırı olarak işlenmesi sebebiyle zarara uğramaları halinde
            giderilmesini talep etme
          </li>
        </ul>
        <Typography variant="body1">
          Kişisel veri sahipleri olarak bu haklarınıza ilişkin taleplerinizi tarafımıza
          info@halapp.io adresini kullanarak iletebilirsiniz. Talepleriniz Şirket tarafından mümkün
          olan en kısa sürede ve her halde 30 (otuz) gün içerisinde değerlendirilerek
          sonuçlandırılacaktır.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          {`BAŞVURU HAKKININ İSTİSNALARI`}
        </Typography>
        <Typography variant="body1">
          KVKK’nın 28/2 hükmü uyarınca, aşağıdaki hallerde zararın giderilmesini talep etme hakkı
          hariç olmak üzere, ilgili kişilerin KVKK’nın 11. maddesinde belirtilen haklardan
          yararlanmaları mümkün olmayacaktır.
        </Typography>
        <ul>
          <li>
            Kişisel veri işlemenin suç işlenmesinin önlenmesi veya suç soruşturması için gerekli
            olması,
          </li>
          <li>İlgili kişinin kendisi tarafından alenileştirilmiş kişisel verilerin işlenmesi.</li>
          <li>
            Kişisel veri işlemenin kanunun verdiği yetkiye dayanılarak görevli ve yetkili kamu kurum
            ve kuruluşları ile kamu kurumu niteliğindeki meslek kuruluşlarınca, denetleme veya
            düzenleme görevlerinin yürütülmesi ile disiplin soruşturma veya kovuşturması için
            gerekli olması,
          </li>
          <li>
            Kişisel veri işlemenin bütçe, vergi ve mali konulara ilişkin olarak devletin ekonomik ve
            mali çıkarlarının korunması için gerekli olması.
          </li>
        </ul>
        <Typography variant="h6" fontWeight={'bold'}>
          {`BAŞVURU YÖNTEMİ`}
        </Typography>
        <Typography variant="body1">
          İlgili kişi, yukarıda sayılan haklarına ilişkin başvurularını Veri Sorumlusuna Başvuru
          Usul ve Esasları Hakkında Tebliğ’de öngörülen başvuru usullerine uygun olarak
          yapabilecektir.
        </Typography>
        <Typography variant="body1">
          6698 Sayılı Kişisel Verilerin Korunması Kanunu 11. Maddesinde sayılan haklar kapsamındaki
          talepler, KVKK’nın 13. Maddesi ile Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında
          Tebliğ’in 5. Maddesi gereğince aşağıda açıklanan yöntemlerden biri ile
          başvurulabilecektir.
        </Typography>
        <Typography variant="body1">
          Şirkete iletilen başvurular, KVKK’nın 13/2 maddesi gereğince, talebin niteliğine göre,
          talebin Şirkete ulaştığı tarihten itibaren 30 gün içinde cevaplandırılacaktır. Başvuruya
          ilişkin cevaplar, KVKK’nın 13. Maddesi gereğince, yazılı ve elektronik ortamdan başvuru
          sahibine ulaştırılacaktır.
        </Typography>
        <table
          border={1}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            borderCollapse: 'collapse'
          }}>
          <tbody>
            <tr>
              <th>
                <b>BAŞVURU YÖNTEMİ</b>
              </th>
              <th>
                <b>BAŞVURU YAPILACAK ADRES</b>
              </th>
              <th>
                <b>BAŞVURUDA YER ALMASI GEREKEN BİLGİ</b>
              </th>
            </tr>
            <tr>
              <td>
                <b>1. Yazılı Olarak Başvuru</b> Islak imzalı şahsen başvuru veya Noter vasıtasıyla
              </td>
              <td>Esentepe Mah. Talatpaşa Cad. Kolektif House No:5 Levent/Şişli/İSTANBUL</td>
              <td>
                Zarfın/tebligatın üzerine ‘’Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi
                Talebi’’ yazılacaktır.
              </td>
            </tr>
            <tr>
              <td>
                <b>2.Kayıtlı Elektronik Posta (KEP) adresi ile</b>
                Kayıtlı Elektronik Posta (KEP) adresi ile
              </td>
              <td>@hs03.kep.tr</td>
              <td>
                E-posta’nın konu kısmına ‘’Kişisel Verilerin Korunması Kanunu Bilgi Talebi’’
                yazılacaktır.
              </td>
            </tr>
            <tr>
              <td>
                <b>3.Şirket Sisteminde Bulunan Elektronik Posta Adresi ile Başvuru</b>{' '}
                Halappsisteminde elektronik posta adresi kullanılmak suretiyle
              </td>
              <td>info@halapp.io</td>
              <td>
                E-posta’nın konu kısmına ‘’Kişisel Verilerin Korunması Kanunu Bilgi Talebi’’
                yazılacaktır.
              </td>
            </tr>
          </tbody>
        </table>
        <Typography variant="body1">
          Talebin kabul edilmesi ya da gerekçesinin açıklanarak reddedilmesi halinde cevap, talep
          sahibine elektronik ortamda ya da yazılı olarak bildirilecektir. Başvuruda yer alan
          talebin kabul edilmesi halinde firmamızca gecikmeksizin gereği yapılacaktır.
        </Typography>
        <Typography variant="h6" fontWeight={'bold'}>
          {`Güncelleme tarihi: 02/02/2023`}
        </Typography>
      </Stack>
    </MainCard>
  );
};

export { AydinlatmaMetni };
