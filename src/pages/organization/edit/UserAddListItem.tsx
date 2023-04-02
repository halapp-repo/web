import { CheckCircleOutlined } from '@ant-design/icons';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import {
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useState } from 'react';

import { Organization } from '../../../models/organization';
import { useAppDispatch } from '../../../store/hooks';
import { postOrganizationUser } from '../../../store/users/usersSlice';
import { UserListItemForm } from './UserListItemForm';

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
