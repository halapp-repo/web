import { Organization } from '../../../models/organization';
import { List, ListItem, CircularProgress, Stack, Typography, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect, Fragment } from 'react';
import {
  fetchAllByOrganizationId,
  selectOrganizationUsers,
  selectIsLoading
} from '../../../store/users/usersSlice';
import Divider from '@mui/material/Divider';
import { UserAddListItem } from './UserAddListItem';

interface UsersProps {
  Organization: Organization;
}

const Users = ({ Organization }: UsersProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => selectOrganizationUsers(state, Organization.ID));
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (!users) {
      dispatch(fetchAllByOrganizationId(Organization.ID!));
    }
  }, []);

  return (
    <List disablePadding={true}>
      {isLoading && (
        <ListItem sx={{ height: '50px', justifyContent: 'center' }}>
          <CircularProgress />
        </ListItem>
      )}
      {!isLoading &&
        users &&
        users.map((u) => (
          <Fragment key={u.ID}>
            <ListItem>
              <Stack spacing={1}>
                <Stack direction={'row'} spacing={2} textAlign="center" alignItems={'center'}>
                  <Typography variant="body2" fontWeight={'bold'}>
                    {u.Email}
                  </Typography>
                  {u.Active && (
                    <Chip color={'success'} size="small" variant="outlined" label={'Etkin'} />
                  )}
                  {!u.Active && (
                    <Chip color={'error'} size="small" variant="outlined" label={'Etkin Degil'} />
                  )}
                </Stack>
              </Stack>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      {!isLoading && <UserAddListItem Organization={Organization} />}
    </List>
  );
};

export { Users };
