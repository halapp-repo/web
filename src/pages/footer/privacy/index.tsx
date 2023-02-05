import { Button, Grid, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GizlilikPolitikasi } from './GizlilikPolitikasi';
import { AydinlatmaMetni } from './AydinlatmaMetni';
import { AcikRizaMetni } from './AcikRizaMetni';
import { KisiselVerilerinKorunmaPolitikasi } from './KisiselVerilerinKorunmaPolitikasi';
import { KullanimSartlari } from './KullanimSartlari';

const Privacy = () => {
  const tabs = {
    '#gizlilik-politikasi': {
      to: '/privacy#gizlilik-politikasi',
      title: 'Gizlilik Politikası'
    },
    '#aydinlatma-metni': {
      to: '/privacy#aydinlatma-metni',
      title: 'Aydınlatma Metni'
    },
    '#kullanim-sartlari': {
      to: '/privacy#kullanim-sartlari',
      title: 'Kullanım Şartları'
    },
    '#acik-riza-metni': {
      to: '/privacy#acik-riza-metni',
      title: 'HALAPP Açık Rıza Metni'
    },
    '#kisisel-verilerin-korunmasi-politikasi': {
      to: '/privacy#kisisel-verilerin-korunmasi-politikasi',
      title: 'Kişisel Verilerin Korunması Politikası'
    }
  };
  const { hash } = useLocation();

  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    if (hash && tabs[hash as keyof typeof tabs]) {
      setActiveTab(hash);
    } else {
      setActiveTab(null);
    }
  }, [hash]);

  const getContent = (activeTab: string | null) => {
    switch (activeTab) {
      case '#gizlilik-politikasi': {
        return <GizlilikPolitikasi />;
      }
      case '#aydinlatma-metni': {
        return <AydinlatmaMetni />;
      }
      case '#acik-riza-metni': {
        return <AcikRizaMetni />;
      }
      case '#kisisel-verilerin-korunmasi-politikasi': {
        return <KisiselVerilerinKorunmaPolitikasi />;
      }
      case '#kullanim-sartlari': {
        return <KullanimSartlari />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <List>
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <ListItem key={key}>
                <Button
                  variant={key === activeTab ? 'contained' : 'outlined'}
                  color="blackNWhite"
                  sx={{ width: '100%', display: 'flex', justifyContent: 'left' }}
                  component={Link}
                  to={value.to}>
                  {value.title}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12} sm={6}>
        {getContent(activeTab)}
      </Grid>
    </Grid>
  );
};

export default Privacy;
