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
          <Typography variant="body2">{`zzz`}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export { DistantSaleContract };
