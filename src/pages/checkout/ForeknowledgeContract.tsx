import { Stack, Typography, Card, CardContent } from '@mui/material';
import '../../themes/styles/scrollbar.css';

const ForeknowledgeContract = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="body1">
        <b>Ön Bilgilendirme Formu</b>
      </Typography>
      <Card elevation={0}>
        <CardContent
          className="scrollbar"
          sx={{
            padding: '20px',
            height: '200px',
            backgroundColor: '#fafafa'
          }}>
          <Typography variant="body2">{`yyy`}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export { ForeknowledgeContract };
