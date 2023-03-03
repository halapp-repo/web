import { Stack, Typography, Card, CardContent } from '@mui/material';
import '../../themes/styles/scrollbar.css';

const DistantSaleContract = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="body1">
        <b>Mesafeli Satış Sözleşmesi</b>
      </Typography>
      <Card elevation={0}>
        <CardContent
          className="scrollbar"
          sx={{
            padding: '20px',
            height: '200px',
            backgroundColor: '#fafafa'
          }}>
          <Typography variant="body2">
            {`Teslimat tarihinden itibaren 15 gün içerisinde iade edebilirsiniz. Nasıl İade Ederim?
            trendyol.com ve mobile uygulamalarda yer alan "Hesabım" bölümünden "Siparişlerime" gidin.
            "Sipariş detay" butonuna basın ve siparişinizin detaylarını görüntüleyin. Kolay iade
            butonuna basın. İade edilecek ürün ve iade nedeni seçin. Aynı üründen birden fazla satın
            aldıysanıziade edilecek ürün adedini de seçmeniz gerekir. Birden fazla kargo seçeneği
            çıktığı durumda kargo seçiminizi yapın. Ekranda çıkan iade kargo kodunu not alın. İade kargo
            kodunuza siparişlerim sayfasından ve üyelik mail adresinize gönderilen bilgilendirme
            mesajından daulaşabilirsiniz. İade edilecek ürünler ile birlikte faturayı tek bir pakete
            koyun.Paketi iade kargo koduyla birlikte seçtiğiniz kargoya 7 gün içinde teslim edin. 7 günü
            geçirdiğiniz durumda yeniden iade kargo kodu almanız gerekir. İade Koşulları: Aşağıdaki
            mesafeli satış sözleşmelerinde cayma hakkı kullanılamamaktadır: a)Fiyatı finansal
            piyasalardaki dalgalanmalara bağlı olarak değişen ve satıcıveya sağlayıcının kontrolünde
            olmayan mal veya hizmetlere ilişkin sözleşmeler. b)Tüketicinin istekleri veya kişisel
            ihtiyaçları doğrultusunda hazırlananmallara ilişkin sözleşmeler. c)Çabuk bozulabilen veya
            son kullanma tarihi geçebilecek mallarınteslimine ilişkin sözleşmeler. ç)Tesliminden sonra
            ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan mallardan; iadesi sağlık ve
            hijyen açısından uygun olmayanların teslimine ilişkin sözleşmeler. d)Tesliminden sonra başka
            ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan mallara ilişkin
            sözleşmeler. e)Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları
            açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf
            malzemelerine ilişkin sözleşmeler. f)Abonelik sözleşmesi kapsamında sağlananlar dışında,
            gazete ve dergi gibisüreli yayınların teslimine ilişkin sözleşmeler. g)Belirli bir tarihte
            veya dönemde yapılması gereken, konaklama, eşyataşıma, araba kiralama, yiyecek-içecek
            tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin
            sözleşmeler. ğ)Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim
            edilen gayrimaddi mallara ilişkin sözleşmeler. h)Cayma hakkı süresi sona ermeden önce,
            tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin sözleşmeler. İade edeceğiniz
            ürünün, paketi hasar görmemiş, kullanılmamış ve kullanım hatası sonucu zarar görmemiş olması
            gerekmektedir. Ürünler kullanılmış, yıpranmış, yıkanmış bir şekilde bize ulaşırsa size geri
            göndermek zorunda kalabiliriz.Bu durumda ücret iadesi yapılmaz. İade etmek istediğiniz
            ürün/ürünleri tüm aksesuarları ve orijinal kutusu ile faturası ile beraber iade etmeniz
            gerekmektedir. Tek kullanımlık ürünlerin ve hızlı bozulan veya son kullanma tarihi geçme
            ihtimali olan ürünlerin iadesi kabul edilmemektedir. Kozmetikve kişisel bakım ürünleri, iç
            giyim ürünleri, mayo, bikini, kitap,kopyalanabilir yazılım ve programlar, DVD, VCD, CD ve
            kasetler ile kırtasiye sarf malzemeleri (toner, kartuş, şerit vb.) ancak ambalajı açılmamış,
            denenmemiş,bozulmamış ve kullanılmamış olmaları halinde iade edilebilir. Beyaz eşya
            (buzdolabı, bulaşık makinesi, çamaşır makinesi, fırınlar [gaz, elektrik,mikrodalga], set
            üstü ocaklar, aspiratörler, ütüler, vantilatör, ısıtıcılar, soğutucular),televizyon vb.
            kurulum gerektiren ürünlerin kutuları ürün tarafınıza teslim edildikten sonra yalnızca
            yetkili servis çalışanları tarafından açılmalıdır.Yetkili servis çalışanlarından önce ürünün
            kutusunun tarafınızca açılması halinde ürün garanti kapsamı dışında kalabilir. Ürün yetkili
            servis çalışanları tarafından açıldıktan sonra üründe herhangi birhasar/kusur/ayıp tespit
            edilmesi halinde yetkili servis çalışanlarına detaylı olarak sorunun not edildiği bir durum
            tespit tutanağı/servis formu/servis raporu doldurtmanız gerekir.Bu belgeyi aldıktan sonra
            ürünü iade etmek istemeniz halinde www.trendyol.com internet sitesi üzerinden iade kodu
            alarak ürünü kargogörevlisine teslim ederek ürünü iade edebilirsiniz.`}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export { DistantSaleContract };
