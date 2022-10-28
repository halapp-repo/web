import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { OrganizationsState } from './organizationsState';
import type { RootState } from '../index';
import { Organization } from '../../models/organization';
import { OrganizationsApi } from './organizationsApi';
import { OrganizationEnrollmentDTO } from '../../models/dtos/organization-enrollment.dto';

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
export const createOrganizationEnrollmentRequest = createAsyncThunk<
  void,
  OrganizationEnrollmentDTO
>('organization/enroll', async (arg): Promise<void> => {
  return await new OrganizationsApi().createEnrollmentRequest(arg);
});

const OrganizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrganizations.fulfilled, (state, action) => {
      const data = action.payload;
      state.Organizations = [...(state.Organizations || []), ...(data || [])];
    });
    builder.addCase(createOrganizationEnrollmentRequest.fulfilled, (state) => {
      state.DidSendOrganizationEnrollment = true;
    });
  }
});

export const selectOrganizations = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.Organizations
);

export const selectSendOrganizationEnrollment = createSelector(
  [(state: RootState) => state.organizations],
  (org: OrganizationsState) => org.DidSendOrganizationEnrollment
);

export default OrganizationsSlice.reducer;
