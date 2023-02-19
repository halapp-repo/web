import { Typography, Stack, Grid } from '@mui/material';
import { Organization } from '../../../models/organization';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
interface OrganizationInfoProps {
  Organization: Organization;
}

const OrganizationInfo = ({ Organization }: OrganizationInfoProps) => {
  return (
    <Grid container>
      <Grid item xs={2} sm={1}>
        <StorefrontOutlinedIcon />
      </Grid>
      <Grid item xs={10} sm={11}>
        <Stack spacing={1}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" fontWeight={'bold'} color="secondary">
                {'Şirket Adı'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="body1"
                color="primary"
                fontWeight={'bold'}
                sx={{ flexGrow: '0', flexShrink: '0', flexBasis: '80%' }}>
                {Organization.Name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" fontWeight={'bold'} color="secondary">
                {'Kontak'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1" sx={{ flexGrow: '0', flexShrink: '0', flexBasis: '80%' }}>
                {Organization.Email}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export { OrganizationInfo };
