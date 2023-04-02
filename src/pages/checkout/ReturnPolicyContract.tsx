import '../../themes/styles/scrollbar.css';

import { Card, CardContent, Stack, Typography } from '@mui/material';

const ReturnPolicyContract = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="body1">
        <b>Cayma Hakkı</b>
      </Typography>
      <Card elevation={0}>
        <CardContent
          className="scrollbar"
          sx={{
            padding: '20px',
            height: '200px',
            backgroundColor: '#fafafa'
          }}>
          <Typography variant="body2">{`xxx`}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export { ReturnPolicyContract };
