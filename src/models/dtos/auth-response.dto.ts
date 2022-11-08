export interface AuthResponseDTO {
  UserId?: string;
  Email?: string;
  Confirmed?: boolean;
  Authenticated?: boolean;
  NeedConfirmation?: boolean;
  Error?: Error | undefined;
  IdToken?: string | undefined;
  AccessToken?: string | undefined;
}
