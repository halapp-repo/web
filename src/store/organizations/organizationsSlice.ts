import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { OrganizationsState } from './organizationsState';
import type { RootState } from '../index';
import { Organization, OrganizationAddress } from '../../models/organization';
import { OrganizationsApi } from './organizationsApi';
import { OrganizationToOrganizationDTOMapper } from '../../mappers/organization-to-organization-dto.mapper';
import { instanceToInstance, plainToClass, plainToInstance } from 'class-transformer';
import { AxiosError } from 'axios';
import { signOut } from '../auth/authSlice';
import { AccountEventType, OrganizationVM } from '@halapp/common';
import { createOrder } from '../orders/ordersSlice';
import { AccountEvent } from '../../models/events/account-event';

const initialState = {
  Organizations: {},
  IsLoading: false,
  Enrollment: undefined,
  AdminList: {},
  Events: {
    IsLoading: false
  }
} as OrganizationsState;

export const fetchOrganizations = createAsyncThunk<OrganizationVM[], void, { state: RootState }>(
  'organizations/fetch',
  async (_, { getState }): Promise<OrganizationVM[]> => {
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
export const fetchAllOrganizations = createAsyncThunk<OrganizationVM[], void, { state: RootState }>(
  'admin/organizations/fetchAllOrganizations',
  async (_, { getState }): Promise<OrganizationVM[]> => {
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
export const fetchIndividualOrganization = createAsyncThunk<
  OrganizationVM,
  string,
  { state: RootState }
>('organization/fetch', async (orgId, { getState }): Promise<OrganizationVM> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }

  const response = await new OrganizationsApi().fetchIndividualOrganization({
    token: userAuth.idToken,
    organizationId: orgId
  });
  return response;
});
export const fetchIndividualOrganizationWithEvents = createAsyncThunk<
  OrganizationVM,
  string,
  { state: RootState }
>('organization/fetchWithEvents', async (orgId, { getState }): Promise<OrganizationVM> => {
  const { userAuth } = getState().auth;
  if (!userAuth.authenticated || !userAuth.idToken) {
    throw new Error('Unauthenticated');
  }
  const response = await new OrganizationsApi().fetchIndividualOrganization({
    token: userAuth.idToken,
    organizationId: orgId,
    includeEvents: true,
    eventTypes: [
      AccountEventType.OrganizationCreatedV1,
      AccountEventType.OrganizationWithdrewFromBalanceV1,
      AccountEventType.OrganizationDepositedToBalanceV1,
      AccountEventType.OrganizationPaidWithCardV1
    ]
  });
  return response;
});
export const updateOrganization = createAsyncThunk<
  OrganizationVM,
  Organization,
  { state: RootState }
>('organization/update', async (arg, { getState }): Promise<OrganizationVM> => {
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
  OrganizationVM,
  { deliveryAddresses: OrganizationAddress[]; organizationId: string },
  { state: RootState }
>('organization/updateDeliveryAddresses', async (arg, { getState }): Promise<OrganizationVM> => {
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
  { OrganizationId: string; Activation: boolean; CreditLimit: number },
  { state: RootState }
>(
  'organization/toggleActivation',
  async ({ OrganizationId, Activation, CreditLimit }, { getState }): Promise<void> => {
    const { userAuth } = getState().auth;
    if (!userAuth.authenticated || !userAuth.idToken) {
      throw new Error('Unauthenticated');
    }
    try {
      return await new OrganizationsApi().toggleOrganizationActivation({
        isActive: Activation,
        creditLimit: CreditLimit,
        organizationId: OrganizationId,
        token: userAuth.idToken
      });
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

const OrganizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    destroyOrganizationList: (state: OrganizationsState) => {
      state.Organizations = {
        List: undefined
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.Organizations = {
        List: undefined
      };
      state.AdminList = {
        List: undefined
      };
    });
    /**
     *
     */
    builder.addCase(signOut.fulfilled, (state) => {
      state.Organizations = undefined;
      state.Enrollment = undefined;
    });
    /**
     * UPDATE ORGANIZATION DELIVERY ADDRESSES
     */
    builder.addCase(updateOrganizationDeliveryAddresses.fulfilled, (state, action) => {
      const organizationId = action.meta.arg.organizationId;
      const organization = action.payload;

      state.Organizations = {
        ...state.Organizations,
        ...(state.Organizations?.List
          ? {
              List: [...(state.Organizations?.List || [])].map((l) => {
                if (l.ID === organizationId) {
                  return organization;
                }
                return l;
              })
            }
          : null)
      };
      state.AdminList = {
        ...state.AdminList,
        ...(state.AdminList?.List
          ? {
              List: [...(state.AdminList?.List || [])].map((l) => {
                if (l.ID === organizationId) {
                  return organization;
                }
                return l;
              })
            }
          : null)
      };
      state.IsLoading = false;
    });

    /**
     * UPDATE ORGANIZATION
     */
    builder.addCase(updateOrganization.fulfilled, (state, action) => {
      const organization = action.payload;
      state.Organizations = {
        ...state.Organizations,
        ...(state.Organizations?.List
          ? {
              List: [...(state.Organizations?.List || [])].map((l) => {
                if (l.ID === organization.ID) {
                  return organization;
                }
                return l;
              })
            }
          : null)
      };
      state.AdminList = {
        ...state.AdminList,
        ...(state.AdminList?.List
          ? {
              List: [...(state.AdminList?.List || [])].map((l) => {
                if (l.ID === organization.ID) {
                  return organization;
                }
                return l;
              })
            }
          : null)
      };
      state.IsLoading = false;
    });
    /*
     * ADMIN / TOGGLE ACTIVATION
     */
    builder.addCase(toggleOrganizationActivation.fulfilled, (state, action) => {
      const { Activation, CreditLimit, OrganizationId } = action.meta.arg;
      state.Organizations = {
        ...state.Organizations,
        ...(state.Organizations?.List
          ? {
              List: [...(state.Organizations?.List || [])].map((l) => {
                if (l.ID === OrganizationId) {
                  l.Active = Activation;
                  l.CreditLimit = CreditLimit;
                }
                return instanceToInstance(l);
              })
            }
          : null)
      };
      state.AdminList = {
        ...state.AdminList,
        ...(state.AdminList?.List
          ? {
              List: [...(state.AdminList?.List || [])].map((l) => {
                if (l.ID === OrganizationId) {
                  l.Active = Activation;
                  l.CreditLimit = CreditLimit;
                }
                return instanceToInstance(l);
              })
            }
          : null)
      };
      state.IsLoading = false;
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
          List: [...(data || [])]
        },
        IsLoading: false
      };
      return state;
    });
    builder.addCase(fetchOrganizations.pending, (state) => {
      state = {
        ...state,
        Organizations: {
          ...state.Organizations
        },
        IsLoading: true
      };
      return state;
    });
    builder.addCase(fetchOrganizations.rejected, (state) => {
      state.Organizations = {
        ...state.Organizations,
        List: null
      };
      state.IsLoading = false;
    });
    /*
     * ADMIN / FETCH ALL ORGANIZATIONS
     */
    builder.addCase(fetchAllOrganizations.fulfilled, (state, action) => {
      const data = action.payload;
      state.AdminList = {
        ...state.AdminList,
        List: [...(data || [])]
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchAllOrganizations.pending, (state) => {
      state.AdminList = {
        ...state.AdminList
      };
      state.IsLoading = true;
    });
    builder.addCase(fetchAllOrganizations.rejected, (state) => {
      state.AdminList = {
        ...state.AdminList,
        List: null
      };
      state.IsLoading = false;
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
    /**
     * CREATE INDIVIDUAL ORGANIZATION
     */
    builder.addCase(fetchIndividualOrganization.fulfilled, (state, action) => {
      const data = action.payload;
      state.Organizations = {
        ...state.Organizations,
        List: [...(state.Organizations?.List || []), data]
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchIndividualOrganization.rejected, (state) => {
      state.Organizations = {
        ...state.Organizations
      };
      state.IsLoading = false;
    });
    builder.addCase(fetchIndividualOrganization.pending, (state) => {
      state.Organizations = {
        ...state.Organizations
      };
      state.IsLoading = true;
    });
    /**
     * CREATE INDIVIDUAL ORGANIZATION WITH EVENTS
     */
    builder.addCase(fetchIndividualOrganizationWithEvents.fulfilled, (state, action) => {
      const orgId = action.meta.arg;
      const data = action.payload;
      state.Events[orgId] = data.Events;
      state.Events.IsLoading = false;
      state.Organizations = {
        ...state.Organizations,
        ...(state.Organizations?.List
          ? {
              List: [...state.Organizations.List]?.map((o) => {
                if (o.ID === orgId) {
                  return data;
                }
                return o;
              })
            }
          : null)
      };
      state.AdminList = {
        ...state.AdminList,
        ...(state.AdminList?.List
          ? {
              List: [...state.AdminList.List]?.map((o) => {
                if (o.ID === orgId) {
                  return data;
                }
                return o;
              })
            }
          : null)
      };
    });
    builder.addCase(fetchIndividualOrganizationWithEvents.rejected, (state, action) => {
      const orgId = action.meta.arg;
      state.Events[orgId] = null;
      state.Events.IsLoading = false;
    });
    builder.addCase(fetchIndividualOrganizationWithEvents.pending, (state) => {
      state.Events.IsLoading = true;
    });
  }
});
export const { destroyOrganizationList } = OrganizationsSlice.actions;

export const selectOrganizations = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => {
    const mapper = new OrganizationToOrganizationDTOMapper();
    return org.Organizations?.List && mapper.toListModel(org.Organizations.List);
  }
);
export const selectIndividualOrganization = createSelector(
  [
    (state: RootState) => state.organizations,
    (state: RootState, orgId?: string): string | undefined => orgId
  ],
  (org: OrganizationsState, orgId?: string) => {
    const mapper = new OrganizationToOrganizationDTOMapper();
    if (orgId) {
      const organization = [
        ...(org.Organizations?.List || []),
        ...(org.AdminList?.List || [])
      ].find((o) => o.ID === orgId);
      if (!organization) {
        return null;
      }
      return mapper.toModel(organization);
    }
    return null;
  }
);
export const selectOrganizationEnrollment = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.Enrollment
);
export const selectOrganizationIsLoading = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.IsLoading
);
export const selectOrganizationEventsIsLoading = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.Events.IsLoading
);
export const selectOrganizationEvents = createSelector(
  [
    (state: RootState) => state.organizations,
    (state: RootState, orgId?: string): string | undefined => orgId
  ],
  (org: OrganizationsState, orgId?: string) => {
    if (orgId) {
      const events = org.Events[orgId];
      if (!events) {
        return events;
      } else {
        return plainToInstance(AccountEvent, events);
      }
    }
    return undefined;
  }
);
export const selectAdminList = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => {
    const mapper = new OrganizationToOrganizationDTOMapper();
    return org.AdminList.List && mapper.toListModel(org.AdminList.List);
  }
);

export default OrganizationsSlice.reducer;
