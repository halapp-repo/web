import { UserVM } from '@halapp/common';

export interface UsersState {
  organizations: {
    [organizationId: string]: UserVM[] | null;
  };
  isLoading: boolean;
}
