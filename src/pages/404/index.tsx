import { Box, Grid, Stack, Typography } from '@mui/material';
import Icon404 from '../../components/icons/Icon404';

const NotFound = () => {
  return (
    <Grid
      container
      rowSpacing={4.5}
      justifyContent="center"
      columnSpacing={2.75}
      alignItems="center">
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction={'column'} spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h3" color="text.secondary" sx={{ fontSize: '12em' }}>
              404
            </Typography>
          </Box>
          <Icon404 Size="xx-large" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NotFound;
