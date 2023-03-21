import { Box, Stack, Typography, Chip, ListItemButton } from '@mui/material';
import { Organization } from '../../../models/organization';
import { useNavigate } from 'react-router-dom';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

interface OrganizationListItemProps {
  Organization: Organization;
}

const OrganizationListItem = ({ Organization }: OrganizationListItemProps) => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      onClick={() => {
        navigate(`/organization/${Organization.ID}`);
      }}>
      <Stack spacing={1}>
        <Stack direction={'row'} spacing={2}>
          <Typography variant="h4">{Organization.Name}</Typography>
        </Stack>
        <Stack spacing={1}>
          <Stack direction={'row'} spacing={1} alignItems="center">
            <PowerSettingsNewIcon color="info" />
            {Organization.Active ? (
              <Chip label="Etkin" size="small" color="success" variant="outlined" />
            ) : (
              <Chip label="Kısıtlı" size="small" color="error" variant="outlined" />
            )}
          </Stack>
          <Stack direction={'row'} spacing={1} alignItems="center">
            <LocationOnOutlined color="info" />
            <Box>
              <Typography variant="body2">{Organization.CompanyAddress?.AddressLine}</Typography>
              <Typography variant="body2">
                {`${Organization.CompanyAddress?.County} ${Organization.CompanyAddress?.City} ${Organization.CompanyAddress?.ZipCode} ${Organization.CompanyAddress?.Country}`}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </ListItemButton>
  );
};

export { OrganizationListItem };
