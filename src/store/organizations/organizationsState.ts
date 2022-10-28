import { Organization } from '../../models/organization';

export interface OrganizationsState {
  Organizations?: Organization[] | null;
  DidSendOrganizationEnrollment: boolean;
}
