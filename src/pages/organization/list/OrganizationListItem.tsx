import {
  Box,
  Stack,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import { Organization } from '../../../models/organization';
import { UserOutlined } from '@ant-design/icons';

interface OrganizationListItemProps {
  organization: Organization;
}

const OrganizationListItem = ({ organization }: OrganizationListItemProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <Stack spacing={1}>
              <Stack direction={'row'} spacing={2} sx={{ alignItems: 'baseline' }}>
                <Typography gutterBottom variant="h3">
                  {organization.Name}
                </Typography>
                {organization.Active ? (
                  <Chip
                    sx={{ borderRadius: '2em' }}
                    label="Aktif"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    sx={{ borderRadius: '2em' }}
                    label="Etkin değil"
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                )}
              </Stack>
              <Stack direction={'row'} spacing={2} sx={{ alignItems: 'baseline' }}>
                <Box>
                  <UserOutlined /> {organization.JoinedUsers?.length || 0}
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">{'Activate'}</Button>
        <Button size="small">{'Düzenle'}</Button>
      </CardActions>
    </Card>
  );
};

export { OrganizationListItem };
