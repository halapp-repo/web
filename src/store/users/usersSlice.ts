import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { UsersState } from './usersState';
import { UserVM } from '@halapp/common';
import { UsersApi } from './usersApi';
import type { RootState } from '../index';
import { UserToUserDTOMapper } from '../../mappers/user-to-user-dto.mapper';

const initialState = {
  isLoading: false,
  organizations: {},
  profiles: {},
  statuses: {
    isProfileLoading: false,
    isProfileUpdating: false
  }
} as UsersState;

export const fetchAllByOrganizationId = createAsyncThunk<UserVM[], string, { state: RootState }>(
  'users/fetchAllByOrganizationId',
  async (orgId, { getState }): Promise<UserVM[]> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }
    const response = await new UsersApi().fetchAllByOrganizationId({
      token: userAuth.idToken,
      organizationId: orgId
    });
    return response;
  }
);

export const postOrganizationUser = createAsyncThunk<
  void,
  { email: string; organizationId: string },
  { state: RootState }
>('users/postOrganizationUser', async (arg, { getState }): Promise<void> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  const response = await new UsersApi().postOrganizationUser({
    token: userAuth.idToken,
    organizationId: arg.organizationId,
    email: arg.email
  });
  return response;
});

export const fetchById = createAsyncThunk<UserVM, string, { state: RootState }>(
  'users/fetchById',
  async (userId, { getState }): Promise<UserVM> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }
    const response = await new UsersApi().fetchById({
      token: userAuth.idToken,
      userId: userId
    });
    return response;
  }
);

export const updateUser = createAsyncThunk<UserVM, UserVM, { state: RootState }>(
  'users/update',
  async (arg, { getState }): Promise<UserVM> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }
    const response = await new UsersApi().updateUser({
      token: userAuth.idToken,
      userVM: arg
    });
    return response;
  }
);

export const uploadAvatar = createAsyncThunk<
  void,
  { ID: string; file: File; preview: ArrayBuffer | string },
  { state: RootState }
>('users/uploadAvatar', async (arg, { getState }): Promise<void> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  if (!arg.ID || !arg.file) {
    throw new Error('ID or File is not defined');
  }
  await new UsersApi().uploadAvatar({
    token: userAuth.idToken,
    file: arg.file,
    userId: arg.ID
  });
});

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllByOrganizationId.fulfilled, (state, action) => {
      const orgId = action.meta.arg;
      state = {
        ...state,
        isLoading: false,
        organizations: {
          ...state.organizations,
          [orgId]: action.payload
        }
      };
      return state;
    });
    builder.addCase(fetchAllByOrganizationId.rejected, (state, action) => {
      const orgId = action.meta.arg;
      state = {
        ...state,
        isLoading: false,
        organizations: {
          ...state.organizations,
          [orgId]: null
        }
      };
      return state;
    });
    builder.addCase(fetchAllByOrganizationId.pending, (state) => {
      state = {
        ...state,
        isLoading: true
      };
      return state;
    });
    builder.addCase(fetchById.fulfilled, (state, action) => {
      const userId = action.meta.arg;
      const newUser = action.payload;
      state = {
        ...state,
        profiles: {
          ...state.profiles,
          [userId]: newUser
        },
        statuses: {
          ...state.statuses,
          isProfileLoading: false
        }
      };
      return state;
    });
    builder.addCase(fetchById.rejected, (state, action) => {
      const userId = action.meta.arg;
      state = {
        ...state,
        profiles: {
          ...state.profiles,
          [userId]: null
        },
        statuses: {
          ...state.statuses,
          isProfileLoading: false
        }
      };
      return state;
    });
    builder.addCase(fetchById.pending, (state) => {
      state = {
        ...state,
        statuses: {
          ...state.statuses,
          isProfileLoading: true
        }
      };
      return state;
    });
    // UPDATE USER
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { ID } = action.meta.arg;
      const newUser = action.payload;
      state = {
        ...state,
        profiles: {
          ...state.profiles,
          [ID]: newUser
        },
        statuses: {
          ...state.statuses,
          isProfileUpdating: false
        }
      };
      return state;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state = {
        ...state,
        statuses: {
          ...state.statuses,
          isProfileUpdating: false
        }
      };
      return state;
    });
    builder.addCase(updateUser.pending, (state) => {
      state = {
        ...state,
        statuses: {
          ...state.statuses,
          isProfileUpdating: true
        }
      };
      return state;
    });
    // UPDATE AVATAR
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      const { ID, preview } = action.meta.arg;

      const user = state.profiles[ID];
      state = {
        ...state,
        profiles: {
          ...state.profiles,
          ...(user
            ? {
                [ID]: {
                  ...user,
                  Preview: preview
                }
              }
            : null)
        },
        statuses: {
          ...state.statuses,
          isProfileUpdating: false
        }
      };

      return state;
    });
    builder.addCase(uploadAvatar.rejected, (state) => {
      state = {
        ...state,
        statuses: {
          ...state.statuses,
          isProfileUpdating: false
        }
      };

      return state;
    });
    builder.addCase(uploadAvatar.pending, (state) => {
      state = {
        ...state,
        statuses: {
          ...state.statuses,
          isProfileUpdating: true
        }
      };
      return state;
    });
  }
});

export const selectOrganizationUsers = createSelector(
  [
    (state: RootState) => state.users,
    (state: RootState, orgId?: string): string | undefined => orgId
  ],
  (users: UsersState, orgId?: string) => {
    if (!orgId) {
      return null;
    }
    const mapper = new UserToUserDTOMapper();
    const rawUsers = users.organizations[orgId];
    return rawUsers && mapper.toListModel(rawUsers);
  }
);

export const selectIsLoading = createSelector(
  [(state: RootState) => state.users],
  (users: UsersState) => {
    return users.isLoading;
  }
);
export const selectProfile = createSelector(
  [
    (state: RootState) => state.users,
    (state: RootState, userId: string | undefined): string | undefined => userId
  ],
  (users: UsersState, userId: string | undefined) => {
    if (!userId) {
      return undefined;
    }
    const mapper = new UserToUserDTOMapper();
    const rawUsers = users.profiles[userId];
    return rawUsers && mapper.toModel(rawUsers);
  }
);
export const selectIsProfileLoading = createSelector(
  [(state: RootState) => state.users],
  (users: UsersState) => {
    return users.statuses.isProfileLoading;
  }
);
export const selectIsProfileUpdating = createSelector(
  [(state: RootState) => state.users],
  (users: UsersState) => {
    return users.statuses.isProfileUpdating;
  }
);

export default UsersSlice.reducer;
