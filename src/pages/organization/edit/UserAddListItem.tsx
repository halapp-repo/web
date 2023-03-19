import {
  Stack,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button,
  IconButton
} from '@mui/material';
import { useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { UserListItemForm } from './UserListItemForm';
import { useAppDispatch } from '../../../store/hooks';
import { Organization } from '../../../models/organization';
import { postOrganizationUser } from '../../../store/users/usersSlice';
import { green } from '@mui/material/colors';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

interface UserAddListItemProps {
  Organization: Organization;
}

const UserAddListItem = ({ Organization }: UserAddListItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [didLinkSend, setDidLinkSend] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmitForm = (email: string): void => {
    dispatch(
      postOrganizationUser({
        email,
        organizationId: Organization.ID!
      })
    );
    setDidLinkSend(true);
  };
  const handleCloseEditMode = () => {
    setEditMode(false);
    setDidLinkSend(false);
  };

  const getContent = () => {
    if (editMode) {
      if (!didLinkSend) {
        return <UserListItemForm OnCancel={handleCloseEditMode} OnEdit={handleSubmitForm} />;
      } else {
        return (
          <ListItem>
            <ListItemText
              primary={
                <Stack spacing={2} justifyContent="center" alignItems={'center'}>
                  <Typography variant="h1" color={green['A400']}>
                    <CheckCircleOutlined />
                  </Typography>
                  <Typography variant="body1" color={'secondary'}>
                    {'Bağlantı gönderildi'}
                  </Typography>
                  <Divider />
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={handleCloseEditMode}>
                    {'Kapat'}
                  </Button>
                </Stack>
              }
            />
          </ListItem>
        );
      }
    } else {
      return (
        <Stack direction={'row'} gap={2} sx={{ pb: '10px' }} justifyContent="center">
          <IconButton onClick={() => setEditMode(true)}>
            <ControlPointOutlinedIcon color="info" style={{ fontSize: '32px' }} />
          </IconButton>
        </Stack>
      );
    }
  };
  return (
    <ListItem sx={{ paddingTop: '20px' }}>
      <ListItemText primary={getContent()} />
    </ListItem>
  );
};

export { UserAddListItem };
