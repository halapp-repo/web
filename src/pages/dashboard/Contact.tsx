import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link
  // useMediaQuery,
} from '@mui/material';
import { WhatsAppOutlined } from '@ant-design/icons';

const Contact = () => {
  return (
    <Card sx={{ minHeight: '250' }}>
      <CardMedia component="img" image="/img/contact-center.jpg" alt="contact center" />
      <CardContent>
        <Typography
          align="center"
          sx={{ fontSize: 20, fontWeight: 'bold' }}
          color="text.secondary"
          gutterBottom>
          7/24 Siparis Hatti
        </Typography>
        <Typography align="center">
          <Link
            href="https://api.whatsapp.com/send?phone=905384503672"
            target="_blank"
            sx={{ display: 'inline-block', color: '#25D366', fontSize: 20 }}>
            <WhatsAppOutlined /> (0538) 450 36 72
          </Link>
        </Typography>
        <Typography
          align="center"
          sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(255, 196, 35)' }}>
          {'Ücretsiz Teslimat!'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Contact;
