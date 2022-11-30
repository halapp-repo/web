import {
  Box,
  Stack,
  Typography,
  Chip,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Organization } from '../../../models/organization';
import { UserOutlined } from '@ant-design/icons';

interface OrganizationListItemProps {
  Organization: Organization;
}

const OrganizationListItem = ({ Organization }: OrganizationListItemProps) => {
  return (
    <ListItem>
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
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '10px', gap: '10px' }}>
              <Box>
                <UserOutlined /> {Organization.JoinedUsers?.length || 0}
              </Box>
            </Box>
          </Box>
        }
      />
      <ListItemSecondaryAction>
        <Stack direction={'column'} spacing={1}>
          <Button variant="outlined" size="small" color="blackNWhite">
            {'Activate'}
          </Button>
          <Button variant="outlined" size="small" color="blackNWhite">
            {'Düzenle'}
          </Button>
        </Stack>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { OrganizationListItem };
