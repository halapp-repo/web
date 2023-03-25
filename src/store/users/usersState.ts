import { UserVM } from '@halapp/common';

export interface UsersState {
  organizations: {
    [organizationId: string]: UserVM[] | null;
  };
  profiles: {
    [userId: string]: UserVM | null;
  };
  isLoading: boolean;
}
