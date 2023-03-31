import { UserVM } from '@halapp/common';

import { UserVMWithPreview } from '../../models/viewmodels/user-with-preview';

export interface UsersState {
  organizations: {
    [organizationId: string]: UserVM[] | null;
  };
  profiles: {
    [userId: string]: UserVMWithPreview | null;
  };
  statuses: {
    isProfileLoading: boolean;
    isProfileUpdating: boolean;
  };
  isLoading: boolean;
}
