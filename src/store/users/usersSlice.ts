import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { UsersState } from './usersState';
import { UserVM } from '@halapp/common';
import { UsersApi } from './usersApi';
import type { RootState } from '../index';
import { UserToUserDTOMapper } from '../../mappers/user-to-user-dto.mapper';

const initialState = {
  isLoading: false,
  organizations: {}
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

export default UsersSlice.reducer;
