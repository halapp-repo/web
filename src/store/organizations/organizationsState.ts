import { Organization } from '../../models/organization';

interface Enrollment {
  DidSendOrganizationEnrollment: boolean;
  Error?: Error | null;
  Organization?: Organization;
}

export interface OrganizationsState {
  Organizations?: {
    List?: Organization[];
  };
  IsLoading: boolean;
  Enrollment?: Enrollment | undefined;
  AdminList: {
    List?: Organization[];
  };
}
