import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  Theme,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import { Organization } from '../../../models/organization';

interface OrganizationListItemProps {
  organization: Organization;
}

const OrganizationListItem = ({ organization }: OrganizationListItemProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Box>
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
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">{'Düzenle'}</Button>
      </CardActions>
    </Card>
  );
};

export { OrganizationListItem };
