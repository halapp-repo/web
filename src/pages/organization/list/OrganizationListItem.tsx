import { Box, Stack, Typography, useMediaQuery, Theme, Avatar, Grid } from '@mui/material';
import IconCompany from '../../../components/icons/IconCompany';
import { Organization } from '../../../models/organization';
import { stringToHslColor } from '../../../utils/avatar';

interface OrganizationListItemProps {
  organization: Organization;
}

const OrganizationListItem = ({ organization }: OrganizationListItemProps) => {
  const matchesMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <Box>
      <Grid container direction="row" spacing={2}>
        {matchesMd || (
          <Grid item>
            <IconCompany Size="medium" />
          </Grid>
        )}
        <Grid item xs={6}>
          <Stack spacing={1}>
            <Typography variant="h3" color="text.primary">
              {organization.Name}
            </Typography>
            <Box>
              <Typography variant="h6" color="text.secondary">
                {organization.CompanyAddress?.AddressLine}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {`${organization.CompanyAddress?.County} ${organization.CompanyAddress?.City} ${organization.CompanyAddress?.ZipCode} ${organization.CompanyAddress?.Country}`}
              </Typography>
            </Box>
            <Box>
              <Stack direction="row" spacing={1}>
                {organization.JoinedUsers?.map((u) => {
                  return (
                    <Avatar
                      key={u.ID}
                      alt={u.Email}
                      sx={{
                        width: 20,
                        height: 20,
                        bgcolor: stringToHslColor(`${u.Email}`, 80, 50)
                      }}>
                      {`${u.Email[0]}`}
                    </Avatar>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid item sx={{ marginLeft: 'auto' }}>
          {organization.CreatedDate?.format('DD-MM-YYYY')}
        </Grid>
      </Grid>
    </Box>
  );
};

export { OrganizationListItem };
