import ChildCareIcon from '@mui/icons-material/ChildCare';
import { Grid, Typography } from '@mui/material';

const OrganizationCreatedActivity = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <ChildCareIcon sx={{ fontSize: '30px' }} />
      </Grid>
      <Grid item xs={12} md={10}>
        <Typography variant="h5">{'Şirket hesabı açıldı'}</Typography>
      </Grid>
    </Grid>
  );
};

export { OrganizationCreatedActivity };
