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
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectUserAuth } from '../../../store/auth/authSlice';
import { toggleOrganizationActivation } from '../../../store/organizations/organizationsSlice';
import { useNavigate } from 'react-router-dom';

interface OrganizationListItemProps {
  Organization: Organization;
}

const OrganizationListItem = ({ Organization }: OrganizationListItemProps) => {
  const userAuth = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleOrganizatinActivation = () => {
    Organization.Active = !Organization.Active;
    dispatch(toggleOrganizationActivation(Organization));
  };

  return (
    <ListItem
      button
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
          {userAuth.isAdmin && (
            <Button
              variant="contained"
              size="small"
              color="admin"
              onClick={toggleOrganizatinActivation}>
              {Organization.Active ? 'Deactivate' : 'Activate'}
            </Button>
          )}
        </Stack>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { OrganizationListItem };
