import { UserVM } from '@halapp/common';

export interface UsersState {
  organizations: {
    [organizationId: string]: UserVM[] | null;
  };
  profiles: {
    [userId: string]: UserVM | null;
  };
  statuses: {
    isProfileLoading: boolean;
    isProfileUpdating: boolean;
  };
  isLoading: boolean;
}
