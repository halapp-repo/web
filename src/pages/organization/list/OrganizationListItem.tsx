import { Box, Stack, Typography, Chip, ListItemButton, ListItemText } from '@mui/material';
import { Organization } from '../../../models/organization';
import { useAppDispatch } from '../../../store/hooks';
import { toggleOrganizationActivation } from '../../../store/organizations/organizationsSlice';
import { useNavigate } from 'react-router-dom';

interface OrganizationListItemProps {
  Organization: Organization;
}

const OrganizationListItem = ({ Organization }: OrganizationListItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleOrganizatinActivation = () => {
    Organization.Active = !Organization.Active;
    dispatch(toggleOrganizationActivation(Organization));
  };

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
