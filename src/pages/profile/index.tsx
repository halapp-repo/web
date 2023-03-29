import { Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  fetchById,
  selectIsProfileLoading,
  selectIsProfileUpdating,
  selectProfile,
  updateUser
} from '../../store/users/usersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { User } from '../../models/user';
import PageWrapper from '../../components/PageWrapper';
import MainCard from '../../components/MainCard';
import { selectUserAuth } from '../../store/auth/authSlice';
import { ProfilePicture } from './ProfilePicture';
import { RetryOnError } from '../../components/RetryOnError';
import { Overlay } from '../../components/Overlay';
import { ProfileEmail } from './ProfileEmail';
import { ProfileForm } from './ProfileForm';
import { UserVM } from '@halapp/common';

const Profile = () => {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(selectUserAuth);
  const isLoading = useAppSelector(selectIsProfileLoading);
  const isUpdating = useAppSelector(selectIsProfileUpdating);
  const navigate = useNavigate();
  const { userId } = useParams();
  const profile: User | null | undefined = useAppSelector((state) => selectProfile(state, userId));
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (!userAuth.authenticated) {
      navigate('/auth/signin');
    }
    if (userId && typeof profile === 'undefined') {
      dispatch(fetchById(userId));
    }
    if (userId === userAuth.id) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [userAuth, userId, profile]);

  const handleRetry = (userId: string | undefined) => {
    if (userId) {
      dispatch(fetchById(userId));
    }
  };
  const handleSubmit = async ({
    firstName,
    lastName,
    phoneNumber
  }: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => {
    if (userId && userId === userAuth.id) {
      dispatch(
        updateUser({
          ID: userId,
          FirstName: firstName,
          LastName: lastName,
          PhoneNumber: phoneNumber
        } as UserVM)
      );
    }
  };

  const getContent = (user: User | null | undefined, editMode: boolean) => {
    if (typeof user === 'undefined') {
      return (
        <Stack justifyContent={'center'} alignItems="center">
          <Typography variant="h4" alignContent={'center'}>
            {'Kullanıcı bulunmamaktadir.'}
          </Typography>
        </Stack>
      );
    } else if (user === null) {
      return (
        <Stack sx={{ justifyContent: 'center' }}>
          <RetryOnError HandleRetry={() => handleRetry(userId)} />
        </Stack>
      );
    } else {
      return (
        <Stack spacing={1}>
          <ProfilePicture EditMode={editMode} User={user} />
          <ProfileEmail Email={user.Email} />
          <ProfileForm User={user} onSubmit={handleSubmit} />
        </Stack>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Overlay />
      ) : (
        <PageWrapper md={4}>
          <MainCard sx={{ padding: '20px' }}>{getContent(profile, editMode)}</MainCard>
        </PageWrapper>
      )}
    </>
  );
};

export default Profile;
