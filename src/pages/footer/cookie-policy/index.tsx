import { Typography, Stack } from '@mui/material';
import Logo from '../../../components/logo/Logo';
import MainCard from '../../../components/MainCard';
import PageWrapper from '../../../components/PageWrapper';

const Contact = () => {
  return (
    <PageWrapper md={6}>
      <MainCard>
        <Stack sx={{ minHeight: '300px', p: '30px' }} spacing={3}>
          <Stack justifyItems="center" alignItems={'center'}>
            <Logo Size="small" />
          </Stack>
          <Typography color="primary" fontWeight={'bold'} variant="h6" sx={{ textAlign: 'center' }}>
            {'ÇEREZ POLİTİKASI VE AYDINLATMA METNİ'}
          </Typography>
          <Typography variant="body1">
            {`Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (Kanun) 10’uncu maddesi ile
            Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ
            kapsamında veri sorumlusu sıfatıyla HALAPP TOPTAN TEDARİK VE YAZILIM TİCARET LİMİTED
            ŞİRKETİ tarafından hazırlanmıştır. Bu Çerez Aydınlatma Metni’nin amacı, internet
            sitemizde kullanılan çerezlerin cihazınıza yerleştirilmesi aracılığıyla otomatik yolla
            elde edilen kişisel verilerin işlenmesine ilişkin olarak, hangi amaçlarla hangi tür
            çerezleri kullandığımızı ve bu çerezleri nasıl yönetebileceğiniz hakkında sizlere bilgi
            vermektir. İnternet sitemizde kullandığımız, zorunlu çerezler haricindeki çerezler için,
            kullanıcıların açık rızaları alınmakta ve istedikleri zaman rızalarını değiştirebilme
            olanağı sağlanmaktadır. Kullanıcılar çerez yönetim paneli üzerinden, internet sitemizde
            kullanılan çerez çeşitlerini görebilmekte ve Zorunlu Çerezler dışında kalan tüm çerezler
            için “açık” veya “kapalı” seçenekleri ile tercihlerini belirleyebilmektedirler. Yine bu
            panel üzerinden kullanıcılar tercihlerini her zaman değiştirebilmektedirler.`}
          </Typography>
          <Typography variant="h6" fontWeight={'bold'}>
            {`Çerez Çeşitleri`}
          </Typography>
          <Typography>
            {`Kullanım süresine göre çerez çeşitleri: İnternet sitemizde kullanım sürelerine göre
            oturum çerezleri ve kalıcı çerezler kullanmaktadır. Oturum çerezi, oturumun
            sürekliliğinin sağlanması amacıyla kullanılmakta olup kullanıcı tarayıcısını
            kapattığında bu çerezler de silinmektedir. Kalıcı çerez ise internet tarayıcısı
            kapatıldığı zaman silinmemekte ve belirli bir tarihte veya belirli bir süre sonra
            kendiliğinden silinmektedir. Birinci Taraf ve Üçüncü Taraf Çerezler: Çerezin birinci
            taraf ya da üçüncü taraf olması durumu, internet sitesinin ya da etki alanının
            yerleştirdiği çereze göre değişiklik arz etmektedir. Birinci taraf çerezler, doğrudan
            kullanıcının ziyaret ettiği internet sitesi yani tarayıcının adres çubuğunda gösterilen
            URL (https://halapp.io/) tarafından yerleştirilmektedir. Üçüncü taraf çerezlerse
            kullanıcının ziyaret ettiği etki alanından farklı bir etki alanı tarafından
            yerleştirilmektedir. İnternet sitemizde yalnızca birinci taraf çerezler
            kullanılmaktadır. Kullanım amaçlarına göre çerez çeşitleri: İnternet sitemizde kullanım
            amacına göre aşağıdaki çerezler kullanılmaktadır:`}
          </Typography>
          <Typography variant="h6" fontWeight={'bold'}>
            &nbsp;&nbsp;{`1) Zorunlu Çerezler:`}
          </Typography>
          <Typography>
            {`Bu çerezler internet sitemizin çalışması amacıyla gerekli olan çerezlerdir. Söz konusu
            çerezler birinci taraf çerezler olup oturum süresince (gizlilik tercihlerinize dair
            çerezler hariç olmak üzere, zira bu çerezler oturum süresinden daha uzun ömürlüdür)
            kişisel veri işlemekte, oturum sonlandığında otomatikman silinmektedirler. Söz konusu
            çerezler talep etmiş olduğunuz bir bilgi toplumu hizmetinin (log-in olma, form doldurma
            ve gizlilik tercihlerinin hatırlanması) yerine getirilebilmesi için zorunlu olarak
            kullanılmaktadırlar. Ayrıca performans ve analitik amaçlı çerez internet sitemizdeki
            ziyaretçilerin sayılması ve trafiğin ölçülmesine olanak sağlamaktadır ve birinci
            taraftır. Bu sayede sitemizin performansını ölçmekte ve iyileştirebilmekteyiz. Bu
            çerezler internet sitemizdeki hangi sayfaların en popüler olduğu, hangilerinin de en az
            popüler olduğunu anlamamıza yardımcı olmaktadır`}
          </Typography>
          <Typography variant="h6" fontWeight={'bold'}>
            &nbsp;&nbsp;{`2) İstatistik Analizi Çerezleri:`}
          </Typography>
          <Typography>
            {`Bu çerezler sitemizin performansını ölçebilmemiz ve iyileştirebilmemiz için sitenin
            ziyaret edilme sayısını ve trafik kaynaklarını sayabilmemizi sağlar. Hangi sayfaların en
            fazla ve en az ziyaret edildiğini ve ziyaretçilerin sitede nasıl gezindiklerini
            öğrenmemize yardımcı olurlar.`}
          </Typography>
          <Typography variant="h6" fontWeight={'bold'}>
            &nbsp;&nbsp;{`3) İşlevsel Çerezler:`}
          </Typography>
          <Typography>
            {`Bu tür çerezler, internet sitemizi daha işlevsel kılmak ve kişiselleştirmek (gizlilik
            tercihleriniz hariç olmak üzere diğer tercihlerinizin siteye tekrar girdiğinizde
            hatırlanmasını sağlamak) üzere kullanılmaktadır.`}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={
              'bold'
            }>{`Kişisel Verilerin Hangi Amaçlarla İşleneceği ve Hukuki Sebepler`}</Typography>
          <Typography>
            {`Zorunlu çerezler, talep etmiş olduğunuz bir bilgi toplumu hizmetinin (log-in olma, form
            doldurma ve gizlilik tercihlerinin hatırlanması, internet sitemizdeki ziyaretçilerin
            sayılması ve trafiğin ölçülmesi) yerine getirilebilmesi amacıyla kullanılmaktadır. Bu
            çerezler aracılığıyla toplanan kişisel verileriniz, Kanunun 5’inci maddesinin (2)
            numaralı fıkrasının (c) bendi “Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya
            ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin
            gerekli olması” veya (f) bendi “İlgili kişinin temel hak ve özgürlüklerine zarar
            vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu
            olması” kapsamında işlenmektedir. İstatistik ve analiz çerezleri sitemizin performansını
            ölçebilmemiz ve iyileştirebilmemiz için sitenin ziyaret edilme sayısını ve trafik
            kaynaklarını sayabilmemizi sağlar. Bu çerezler, Kanun’un 5’inci maddesinin (1) numaralı
            fıkrası kapsamında`}{' '}
            <b>{`açık rızanızın`}</b>{' '}
            {`alınması suretiyle işlenmektedir. İşlevsel çerezler, internet
            sayfamızı daha işlevsel kılmak ve kişiselleştirmek (gizlilik tercihleriniz hariç olmak
            üzere diğer tercihlerinizin siteye tekrar girdiğinizde hatırlanmasını sağlamak)
            amaçlarıyla kullanılmaktadır. Bu çerezler aracılığıyla toplanan kişisel verileriniz,
            Kanun’un 5’inci maddesinin (1) numaralı fıkrası kapsamında`}{' '}
            <b>{`açık rızanızın`}</b>{' '}
            {`alınması suretiyle işlenmektedir. İnternet sitemizde yer alan
            çerezlere ilişkin bilgiler aşağıdaki tablolarda yer almaktadır:`}
          </Typography>
          <Typography variant="h6" fontWeight={'bold'}>{`Google Analytics Çerezleri`}</Typography>
          <Typography>
            Bu internet sitesi, Google Inc.&#39;in (&quot;Google&quot;) bir web analiz hizmeti olan
            Google Analytics&#39;i kullanmaktadır. Google Analytics, bilgisayarınıza kaydedilen ve
            internet sitesi kullanımınızın analiz edilmesini sağlayan bir çerez türüdür. Bu internet
            sitesini kullanımınızla ilgili olarak çerez tarafından oluşturulan bilgiler genellikle
            ABD&#39;de bulunan Google sunucusuna aktarılır ve orada saklanır. İnternet sitemizin
            kullanımını analiz etmek ve düzenli olarak iyileştirmek için Google Analytics
            kullanıyoruz. Elde ettiğimiz istatistikleri, hizmetlerimizi geliştirmek için
            kullanmaktayız.
          </Typography>
          <Typography>
            Ayrıntılı bilgi için{' '}
            <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>{' '}
            adresini ziyaret edebilirsiniz.
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
                <th>Çerez İsmi</th>
                <th>Çerezin Amacı</th>
                <th>Çerez Tipi</th>
                <th>Çerezin Saklama Süreci</th>
              </tr>
              <tr>
                <td>_ga</td>
                <td>
                  Ziyaretçinin internet sitesini nasıl kullandığına ilişkin istatistiksel veriler
                  oluşturmak için kullanılan benzersiz bir kimlik kaydeder
                </td>
                <td>Üçüncü taraf çerez</td>
                <td>2 yıl</td>
              </tr>
              <tr>
                <td>_ga_#</td>
                <td>
                  Google Analytics tarafından, bir kullanıcının web sitesini kaç kez ziyaret
                  ettiğinin yanı sıra ilk ve en son ziyaretin tarihlerine ilişkin verileri toplamak
                  için kullanılır.
                </td>
                <td>Üçüncü taraf çerez</td>
                <td>2 yıl</td>
              </tr>
            </tbody>
          </table>
          <Typography variant="h6" fontWeight={'bold'}>{`İlgili Kişilerin Talepleri`}</Typography>
          <Typography>
            İnternet sitemizde kullanılan çerezler yoluyla kişisel verileri işlenen ilgili kişiler,
            Kişisel Verilerin Korunması Kanunu’nun 11’inci maddesi kapsamındaki taleplerini, “Veri
            Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliği”ne Esentepe Mah. Talatpaşa Cad.
            KolektifHouse No:5 Levent/Şişli/İstanbul adresine yazılı olarak veya e-postasının
            sistemimizde kayıtlı bulunması halinde söz konusu e-posta üzerinden{' '}
            <a href="mailto:info@halapp.io">info@halapp.io</a> e-posta adresine iletebilmektedir.
          </Typography>
          <Typography
            variant="h6"
            fontWeight={'bold'}>{`Tarayıcı Ayarlarından Çerez Ayarları`}</Typography>
          <Typography>
            İnternet sitemizde yer alan ikona tıklayarak istediğiniz anda çerezlere ilişkin
            tercihlerinizi değiştirebilirsiniz. Çerez yönetim panelindeki butonları tercihinize göre
            açık veya kapalı konuma getirerek “Ayarları kaydet” butonuna tıklayınız. Ayarlarınızı
            etkin hâle getirmek için sayfayı yenileyiniz. Bunun yanı sıra, tarayıcı ayarları
            aracılığıyla da kısmen kontrol sağlanabilmektedir. Sık kullanılan tarayıcılarda
            çerezlerin yönetimine ilişkin bilgilere aşağıdaki bağlantılar aracılığıyla
            erişebilirsiniz:
          </Typography>
          <ul>
            <li>Google Chrome</li>
            <a
              href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&amp;hl=e
            n">{`https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=e
            n`}</a>
            <br />
            <br />
            <li>Mozilla Firefox</li>
            <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer">{`https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer`}</a>
            <br />
            <br />
            <li>Microsoft Internet Explorer</li>
            <a href="https://support.microsoft.com/en-gb/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d">{`https://support.microsoft.com/en-gb/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d`}</a>
            <br />
            <br />
            <li>Microsoft Edge</li>
            <a href="https://support.microsoft.com/tr-tr/windows/microsoft-edge-g%C3%B6z-atma-verileri-ve-gizlilik-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd">
              {`https://support.microsoft.com/tr-tr/windows/microsoft-edge-g%C3%B6z-atma-verileri-ve-gizlilik-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd`}
            </a>
            <br />
            <br />
            <li>Yandex Browser</li>
            <a href="https://browser.yandex.com.tr/help/personal-data-protection/cookies.html">{`https://browser.yandex.com.tr/help/personal-data-protection/cookies.html`}</a>
            <br />
            <br />
            <li>Safari</li>
            <a href="https://help.apple.com/safari/mac/9.0/">{`https://help.apple.com/safari/mac/9.0/`}</a>
            <br />
            <br />
            <li>Opera</li>
            <a href="https://help.opera.com/en/latest/web-preferences/">{`https://help.opera.com/en/latest/web-preferences/`}</a>
            <br />
            <br />
          </ul>
        </Stack>
      </MainCard>
    </PageWrapper>
  );
};

export default Contact;
