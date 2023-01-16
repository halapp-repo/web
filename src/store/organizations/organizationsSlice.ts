import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { OrganizationsState } from './organizationsState';
import type { RootState } from '../index';
import { Organization, OrganizationAddress } from '../../models/organization';
import { OrganizationsApi } from './organizationsApi';
import { OrganizationToOrganizationDTOMapper } from '../../mappers/organization-to-organization-dto.mapper';
import { plainToClass } from 'class-transformer';
import { AxiosError } from 'axios';

const initialState = {
  Organizations: {
    IsLoading: false
  },
  Enrollment: undefined
} as OrganizationsState;

export const fetchOrganizations = createAsyncThunk<Organization[], void, { state: RootState }>(
  'organizations/fetch',
  async (_, { getState }): Promise<Organization[]> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }

    const response = await new OrganizationsApi().fetchOrganizations({
      token: userAuth.idToken
    });
    return response;
  }
);
export const fetchAllOrganizations = createAsyncThunk<Organization[], void, { state: RootState }>(
  'admin/organizations/fetchAllOrganizations',
  async (_, { getState }): Promise<Organization[]> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }

    const response = await new OrganizationsApi().fetchAllOrganizations({
      token: userAuth.idToken
    });
    return response;
  }
);
export const updateOrganization = createAsyncThunk<
  Organization,
  Organization,
  { state: RootState }
>('organization/update', async (arg, { getState }): Promise<Organization> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  const mapper = new OrganizationToOrganizationDTOMapper();
  try {
    return await new OrganizationsApi().updateOrganization({
      token: userAuth.idToken,
      organization: mapper.toDTO(arg)
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(JSON.stringify(err.response?.data || { message: 'Bilinmeyen hata olustu' }));
    } else {
      throw err;
    }
  }
});
export const updateOrganizationDeliveryAddresses = createAsyncThunk<
  Organization,
  { deliveryAddresses: OrganizationAddress[]; organizationId: string },
  { state: RootState }
>('organization/updateDeliveryAddresses', async (arg, { getState }): Promise<Organization> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  try {
    return await new OrganizationsApi().updateOrganizationDeliveryAddresses({
      token: userAuth.idToken,
      organizationId: arg.organizationId,
      deliveryAddresses: arg.deliveryAddresses
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(JSON.stringify(err.response?.data || { message: 'Bilinmeyen hata olustu' }));
    } else {
      throw err;
    }
  }
});

export const createOrganizationEnrollmentRequest = createAsyncThunk<void, Organization>(
  'organization/enroll',
  async (arg): Promise<void> => {
    const mapper = new OrganizationToOrganizationDTOMapper();
    try {
      return await new OrganizationsApi().createEnrollmentRequest(mapper.toDTO(arg));
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(
          JSON.stringify(err.response?.data || { message: 'Bilinmeyen hata olustu' })
        );
      } else {
        throw err;
      }
    }
  }
);
export const toggleOrganizationActivation = createAsyncThunk<
  void,
  Organization,
  { state: RootState }
>('organization/toggleActivation', async (arg, { getState }): Promise<void> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  try {
    return await new OrganizationsApi().toggleOrganizationActivation({
      isActive: arg.Active!,
      organizationId: arg.ID!,
      token: userAuth.idToken
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(JSON.stringify(err.response?.data || { message: 'Bilinmeyen hata olustu' }));
    } else {
      throw err;
    }
  }
});

const OrganizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * UPDATE ORGANIZATION DELIVERY ADDRESSES
     */
    builder.addCase(updateOrganizationDeliveryAddresses.fulfilled, (state, action) => {
      const organizationId = action.meta.arg.organizationId;
      const organization = action.payload;

      state.Organizations = {
        ...state.Organizations,
        IsLoading: false,
        List: [...(state.Organizations?.List || [])].map((l) => {
          if (l.ID === organizationId) {
            return organization;
          }
          return l;
        })
      };
    });

    /**
     * UPDATE ORGANIZATION
     */
    builder.addCase(updateOrganization.fulfilled, (state, action) => {
      const organization = action.payload;
      state.Organizations = {
        ...state.Organizations,
        IsLoading: false,
        List: [...(state.Organizations?.List || [])].map((l) => {
          if (l.ID === organization.ID) {
            return organization;
          }
          return l;
        })
      };
    });
    /*
     * ADMIN / TOGGLE ACTIVATION
     */
    builder.addCase(toggleOrganizationActivation.fulfilled, (state, action) => {
      const { ID, Active } = action.meta.arg;
      state.Organizations = {
        ...state.Organizations,
        IsLoading: false,
        List: [...(state.Organizations?.List || [])].map((l) => {
          if (l.ID === ID) {
            l.Active = Active;
          }
          return l;
        })
      };
    });
    /*
     *  FETCH ORGANIZATIONS
     */
    builder.addCase(fetchOrganizations.fulfilled, (state, action) => {
      const data = action.payload;
      state = {
        ...state,
        Organizations: {
          ...state.Organizations,
          List: [...(data || [])],
          IsLoading: false
        }
      };
      return state;
    });
    builder.addCase(fetchOrganizations.pending, (state) => {
      state = {
        ...state,
        Organizations: {
          ...state.Organizations,
          IsLoading: true
        }
      };
      return state;
    });
    builder.addCase(fetchOrganizations.rejected, (state) => {
      state.Organizations = {
        ...state.Organizations,
        List: [],
        IsLoading: false
      };
    });
    /*
     * ADMIN / FETCH ALL ORGANIZATIONS
     */
    builder.addCase(fetchAllOrganizations.fulfilled, (state, action) => {
      const data = action.payload;
      state.Organizations = {
        ...state.Organizations,
        List: [...(data || [])],
        IsLoading: false
      };
    });
    builder.addCase(fetchAllOrganizations.pending, (state) => {
      state.Organizations = {
        ...state.Organizations,
        IsLoading: true
      };
    });
    builder.addCase(fetchAllOrganizations.rejected, (state) => {
      state.Organizations = {
        ...state.Organizations,
        List: [],
        IsLoading: false
      };
    });
    /*
     *  CREATE ENROLLMENT
     */
    builder.addCase(createOrganizationEnrollmentRequest.fulfilled, (state, action) => {
      state.Enrollment = {
        ...state.Enrollment,
        DidSendOrganizationEnrollment: true,
        Error: null,
        Organization: plainToClass(Organization, action.meta.arg)
      };
    });
    builder.addCase(createOrganizationEnrollmentRequest.rejected, (state, action) => {
      const { message: rawMessage } = action.error;
      const message = JSON.parse(rawMessage || '{}');
      state.Enrollment = {
        ...state.Enrollment,
        DidSendOrganizationEnrollment: false,
        Error: new Error(message.message || 'Bilinmeyen hata olustu')
      };
    });
  }
});

export const selectOrganizations = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.Organizations
);

export const selectIndividualOrganization = createSelector(
  [
    (state: RootState) => state.organizations,
    (state: RootState, orgId?: string): string | undefined => orgId
  ],
  (org: OrganizationsState, orgId?: string) => {
    if (orgId) {
      const organization = org.Organizations?.List?.find((o) => o.ID === orgId);
      if (!organization) {
        return null;
      }
      return organization;
    }
    return null;
  }
);

export const selectOrganizationEnrollment = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.Enrollment
);

export default OrganizationsSlice.reducer;
