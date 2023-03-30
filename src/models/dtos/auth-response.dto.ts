import { UserVMWithPreview } from '../viewmodels/user-with-preview';

export interface AuthResponseDTO {
  UserId?: string;
  Email?: string;
  Confirmed?: boolean;
  Authenticated?: boolean;
  NeedConfirmation?: boolean;
  Error?: Error | undefined;
  IdToken?: string | undefined;
  AccessToken?: string | undefined;
  IsAdmin?: boolean;
  Profile?: UserVMWithPreview;
}
