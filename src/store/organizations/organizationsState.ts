import { Organization } from '../../models/organization';

interface Enrollment {
  DidSendOrganizationEnrollment: boolean;
  Error?: Error | null;
  Organization?: Organization;
}

export interface OrganizationsState {
  Organizations?: Organization[] | null;
  Enrollment?: Enrollment | undefined;
}
