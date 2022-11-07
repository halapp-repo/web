export type UserAuth = {
  userId: string;
  authenticated: boolean;
  confirmed: boolean;
  email: string;
  needConfirmation: boolean;
  error?: Error | null | undefined;
};

export interface AuthState {
  userAuth: UserAuth;
}
