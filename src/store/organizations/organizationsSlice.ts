import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { OrganizationsState } from './organizationsState';
import type { RootState } from '../index';
import { Organization } from '../../models/organization';
import { OrganizationsApi } from './organizationsApi';
import { OrganizationToOrganizationDTOMapper } from '../../mappers/organization-to-organization-dto.mapper';
import { plainToClass } from 'class-transformer';

const initialState = {
  Organizations: [],
  DidSendOrganizationEnrollment: false
} as OrganizationsState;

export const fetchOrganizations = createAsyncThunk<Organization[]>(
  'organizations/fetch',
  async (): Promise<Organization[]> => {
    const response = await new OrganizationsApi().fetchOrganizations();
    return response;
  }
);
export const createOrganizationEnrollmentRequest = createAsyncThunk<void, Organization>(
  'organization/enroll',
  async (arg): Promise<void> => {
    const mapper = new OrganizationToOrganizationDTOMapper();
    return await new OrganizationsApi().createEnrollmentRequest(mapper.toDTO(arg));
  }
);

const OrganizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrganizations.fulfilled, (state, action) => {
      const data = action.payload;
      state.Organizations = [...(state.Organizations || []), ...(data || [])];
    });
    builder.addCase(createOrganizationEnrollmentRequest.fulfilled, (state, action) => {
      state.Enrollment = {
        DidSendOrganizationEnrollment: true,
        Organization: plainToClass(Organization, action.meta.arg)
      };
    });
  }
});

export const selectOrganizations = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.Organizations
);

export const selectOrganizationEnrollment = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.Enrollment
);

export default OrganizationsSlice.reducer;
