import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Avatar,
  Typography,
  CardActions,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  Theme,
  IconButton,
  Switch,
  Divider
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

const CookiePolicy = () => {
  const { pathname } = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const fullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const getContent = () => {
    const canBeSeen = pathname !== '/cerez-politikasi';
    if (!canBeSeen) {
      return null;
    }
    return (
      <Box
        sx={{
          position: 'fixed',
          zIndex: '10000',
          bottom: '0px',
          width: '100%',
          minHeight: '200px',
          padding: '10px'
        }}>
        <Grid container justifyContent={'center'} alignContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ width: '100%', height: '100%', backgroundColor: '#ffc423' }} elevation={10}>
              <CardHeader
                titleTypographyProps={{ variant: 'h5' }}
                avatar={
                  <Avatar sx={{ bgcolor: '#ffc423', fontSize: '2.5rem', paddingBottom: '3px' }}>
                    🍪
                  </Avatar>
                }
                title="Çerez Kullanıyoruz"
              />
              <CardContent>
                <Typography variant="body2">
                  {`İnternet sayfamızda birinci taraf çerezler ile kişisel veri işlenmekte olup
                  gerekli olan çerezler bilgi toplumu hizmetlerinin sunulması amacıyla
                  kullanılmaktadır. Diğer çerezler açık rıza vermeniz halinde, sizlere yönelik,
                  istatistik analizi yapılması, sitemizin daha işlevsel kılınması ve
                  kişiselleştirilmesi (tercih ayarlarınızın hatırlanması gibi) amaçlarıyla sınırlı
                  olarak kullanılacaktır.`}{' '}
                  <Link to={'/cerez-politikasi'} color={blue[500]}>
                    {`Çerez Politikası Aydınlatma Metni`}
                  </Link>{' '}
                  {`için tıklayınız.`}
                </Typography>
                <Typography variant="body2"></Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', gap: 1 }}>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="contained" color="blackNWhite">
                    {'Hepsini Reddet'}
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="blackNWhite"
                    onClick={handleDialogOpen}>
                    {'Çerez Ayarlarını Yapılandır'}
                  </Button>
                </Stack>
                <Button size="small" variant="contained" color="success" sx={{ color: '#ffff' }}>
                  {'Hepsini Kabul Et'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: '#ffc423'
            }
          }}
          sx={{ zIndex: 20000 }}
          fullScreen={fullScreen}
          open={dialogOpen}
          onClose={handleDialogClose}>
          <DialogTitle
            variant="body1"
            sx={{ display: 'flex' }}
            fontWeight={'bold'}
            alignItems="center"
            justifyContent="space-between">
            {'ÇEREZ YÖNETİM PANELİ'}
            <IconButton onClick={handleDialogClose}>
              <CloseOutlined />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant="body2" color={'#00000'}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontWeight={'bold'}>{'Zorunlu Çerezler'}</Typography>
                    <Typography>{''}</Typography>
                  </Stack>
                  <Typography>
                    İnternet sitemizin çalışması için zorunlu çerezlerdir. Bunlar genellikle
                    yalnızca sizin işlemlerinizi gerçekleştirmek için ayarlanmıştır. Bu işlemler,
                    gizlilik tercihlerinizi belirlemek, oturum açmak veya form doldurmak gibi hizmet
                    taleplerinizi içerir. Tarayıcınızı, bu çerezleri engelleyecek veya bunlar
                    hakkında sizi uyaracak şekilde ayarlayabilirsiniz ancak bu durumda sitenin bazı
                    bölümleri çalışmayabilir.
                  </Typography>
                </Stack>
                <Divider />
                <Stack spacing={1}>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontWeight={'bold'}>{'İstatistik Analizi Çerezleri'}</Typography>
                    <Switch defaultChecked color="info" />
                  </Stack>
                  <Typography>
                    Bu çerezler sitemizin performansını ölçebilmemiz ve iyileştirebilmemiz için
                    sitenin ziyaret edilme sayısını ve trafik kaynaklarını sayabilmemizi sağlar.
                    Hangi sayfaların en fazla ve en az ziyaret edildiğini ve ziyaretçilerin sitede
                    nasıl gezindiklerini öğrenmemize yardımcı olurlar.
                  </Typography>
                </Stack>
                <Divider />
                <Stack spacing={1}>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontWeight={'bold'}>{'İşlevsel Çerezler'}</Typography>
                    <Switch defaultChecked color="info" />
                  </Stack>
                  <Typography>
                    Bu çerezler, internet sitemizi daha işlevsel kılmak ve kişiselleştirmek (tercih
                    ayarlarınızın hatırlanması gibi) üzere kullanılmaktadır. Bunlar bizim
                    tarafımızdan ayarlanabilir. Bu tanımlama bilgilerine izin vermezseniz bu
                    işlevlerden tümü veya bazıları doğru şekilde çalışmayabilir.
                  </Typography>
                </Stack>
              </Stack>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="blackNWhite" variant="contained" onClick={handleDialogClose} autoFocus>
              Seçimi Onayla
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  return getContent();
};

export { CookiePolicy };
