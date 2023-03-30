import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { UserToUserDTOMapper } from '../../mappers/user-to-user-dto.mapper';
import { USERSESSION } from '../../models/constants/user-session';
import { UserSessionStorage } from '../../models/viewmodels/user-session.storage';
import { fetchById, updateUser, uploadAvatar } from '../users/usersSlice';
import { ProfileState } from './profileState';

const defaultProfile: ProfileState = {
  profile: undefined
};

const initialState = {
  profile: defaultProfile
} as ProfileState;

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state: ProfileState) => {
      let profile;
      const rawCognitoUser = localStorage.getItem(USERSESSION);
      if (rawCognitoUser) {
        const storage = JSON.parse(rawCognitoUser) as UserSessionStorage;
        profile = storage.profile;
      }
      state.profile = profile;
    }
  },
  extraReducers: (builder) => {
    // fetch user
    builder.addCase(fetchById.fulfilled, (state, action) => {
      const { isMyProfile } = action.meta.arg;
      const payload = action.payload;
      if (isMyProfile) {
        const rawCognitoUser = localStorage.getItem(USERSESSION);
        if (rawCognitoUser) {
          const storage = JSON.parse(rawCognitoUser) as UserSessionStorage;
          localStorage.setItem(
            USERSESSION,
            JSON.stringify({
              ...storage,
              profile: payload
            } as UserSessionStorage)
          );
          state = {
            ...state,
            profile: payload
          };
          return state;
        }
      }
      return state;
    });
    builder.addCase(fetchById.rejected, (state, action) => {
      const { isMyProfile } = action.meta.arg;
      if (isMyProfile) {
        let backupProfile;
        const rawCognitoUser = localStorage.getItem(USERSESSION);
        if (rawCognitoUser) {
          const storage = JSON.parse(rawCognitoUser) as UserSessionStorage;
          backupProfile = storage.profile;
        }
        state = {
          ...state,
          profile: backupProfile
        };
        return state;
      }
      return state;
    });
    // update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const payload = action.payload;
      const rawCognitoUser = localStorage.getItem(USERSESSION);
      if (rawCognitoUser) {
        const storage = JSON.parse(rawCognitoUser) as UserSessionStorage;
        localStorage.setItem(
          USERSESSION,
          JSON.stringify({
            ...storage,
            profile: payload
          } as UserSessionStorage)
        );
        state = {
          ...state,
          profile: payload
        };
        return state;
      }
      return state;
    });
    // update avatar
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      const { preview } = action.meta.arg;
      const rawCognitoUser = localStorage.getItem(USERSESSION);
      if (rawCognitoUser) {
        const storage = JSON.parse(rawCognitoUser) as UserSessionStorage;
        localStorage.setItem(
          USERSESSION,
          JSON.stringify({
            ...storage,
            profile: {
              ...storage.profile,
              Preview: preview
            }
          } as UserSessionStorage)
        );
        const stateProfile = state.profile;
        state = {
          ...state,
          ...(stateProfile
            ? {
                profile: {
                  ...stateProfile,
                  Preview: preview
                }
              }
            : null)
        };
        return state;
      }
      return state;
    });
  }
});

export const { getProfile } = ProfileSlice.actions;

export const selectUserProfile = createSelector([(state: RootState) => state.profile], (state) => {
  const profile = state.profile;
  const mapper = new UserToUserDTOMapper();
  if (profile) {
    return mapper.toModel(profile);
  }
  return undefined;
});

export default ProfileSlice.reducer;
