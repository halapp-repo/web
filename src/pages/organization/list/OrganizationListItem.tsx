import { Box, Stack, Typography, Chip, ListItemButton, ListItemText } from '@mui/material';
import { Organization } from '../../../models/organization';
import { useNavigate } from 'react-router-dom';

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
      <ListItemText
        inset={false}
        primary={
          <Stack direction={'row'} spacing={2}>
            <Typography variant="h4">{Organization.Name}</Typography>
            {Organization.Active ? (
              <Chip label="Etkin" size="small" color="success" variant="outlined" />
            ) : (
              <Chip label="Kısıtlı" size="small" color="error" variant="outlined" />
            )}
          </Stack>
        }
        secondary={
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2">{Organization.CompanyAddress?.AddressLine}</Typography>
            <Typography variant="body2">
              {`${Organization.CompanyAddress?.County} ${Organization.CompanyAddress?.City} ${Organization.CompanyAddress?.ZipCode} ${Organization.CompanyAddress?.Country}`}{' '}
            </Typography>
          </Box>
        }
      />
    </ListItemButton>
  );
};

export { OrganizationListItem };
