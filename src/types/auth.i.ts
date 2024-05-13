import { CurrentUser } from './current-user.i';

export interface IAuthContext {
  auth: CurrentUser | null; // Replace  actual type of auth state
  setAuth: (currentUser: AuthenticateResponse) => void; // Replace 'any' with the actual type of your auth state
  isAuthenticated: () => boolean;
  logout: () => Promise<any>;
  tokens: AuthenticateResponse | null;
}

export interface AuthenticateResponse {
  token: string;
}
