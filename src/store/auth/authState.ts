export type UserAuth = {
  userId: string;
  authenticated: boolean;
  confirmed: boolean;
  email: string;
};

export interface AuthState {
  userAuth: UserAuth;
}
