import { AccountEventVM, OrganizationVM } from '@halapp/common';
import { Organization } from '../../models/organization';

interface Enrollment {
  DidSendOrganizationEnrollment: boolean;
  Error?: Error | null;
  Organization?: Organization;
}

export interface OrganizationsState {
  Organizations?: {
    List?: OrganizationVM[] | null;
  };
  IsLoading: boolean;
  Enrollment?: Enrollment | undefined;
  AdminList: {
    List?: OrganizationVM[] | null;
  };
  Events: {
    [organizationId: string]: AccountEventVM[] | undefined | null;
  } & { IsLoading: boolean };
}
