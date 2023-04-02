import { UserVM } from '@halapp/common';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MainCard from '../../components/MainCard';
import { Overlay } from '../../components/Overlay';
import PageWrapper from '../../components/PageWrapper';
import { RetryOnError } from '../../components/RetryOnError';
import { UpdatingCover } from '../../components/UpdatingCover';
import { User } from '../../models/user';
import { selectUserAuth } from '../../store/auth/authSlice';
import { UserAuth } from '../../store/auth/authState';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchById,
  selectIsProfileLoading,
  selectIsProfileUpdating,
  selectProfile,
  updateUser
} from '../../store/users/usersSlice';
import { ProfileEmail } from './ProfileEmail';
import { ProfileForm } from './ProfileForm';
import { ProfilePicture } from './ProfilePicture';

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
      dispatch(
        fetchById({
          userId: userId,
          isMyProfile: userId === userAuth.id
        })
      );
    }
    if (userId === userAuth.id) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [userAuth, userId, profile]);

  const handleRetry = (userId: string | undefined, userAuth: UserAuth) => {
    if (userId) {
      dispatch(
        fetchById({
          userId,
          isMyProfile: userId === userAuth.id
        })
      );
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
          <RetryOnError HandleRetry={() => handleRetry(userId, userAuth)} />
        </Stack>
      );
    } else {
      return (
        <UpdatingCover isUpdating={isUpdating}>
          <Stack spacing={1}>
            <ProfilePicture EditMode={editMode} User={user} />
            <ProfileEmail Email={user.Email} />
            <ProfileForm User={user} onSubmit={handleSubmit} />
          </Stack>
        </UpdatingCover>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Overlay />
      ) : (
        <Box sx={{ position: 'relative' }}>
          <PageWrapper md={4}>
            <MainCard sx={{ padding: '20px' }}>{getContent(profile, editMode)}</MainCard>
          </PageWrapper>
        </Box>
      )}
    </>
  );
};

export default Profile;
