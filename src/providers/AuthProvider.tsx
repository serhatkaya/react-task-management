import { jwtDecode } from 'jwt-decode';
import { ReactNode, createContext, useState } from 'react';
import { AuthenticateResponse, IAuthContext } from '../types/auth.i';
import { CurrentUser } from '../types/current-user.i';
import { StorageSet } from '../utils/storage-set.util';

const AuthContext = createContext<IAuthContext>({
  auth: null, // Replace with your default auth state
  setAuth: () => {
    throw new Error(
      'setAuth function should not be called outside of a AuthProvider'
    );
  },
  isAuthenticated: () => {
    throw new Error(
      'isAuthenticated function should not be called outside of a AuthProvider'
    );
  },
  logout: () => {
    throw new Error(
      'logout function should not be called outside of a AuthProvider'
    );
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authStore = new StorageSet<AuthenticateResponse>('auth');
  const getTokens = () => authStore.get(null);
  const decodeJwt = (data: AuthenticateResponse | null): CurrentUser | null => {
    return data?.token ? jwtDecode<CurrentUser>(data.token) : null;
  };

  /** States */
  const [tokens, setTokens] = useState<AuthenticateResponse>(getTokens());
  const [auth, setAuthState] = useState<CurrentUser | null>(
    decodeJwt(getTokens())
  );

  // Custom setAuth method
  const setAuth = (res: AuthenticateResponse) => {
    const payload = decodeJwt(res);
    setAuthState(payload);
    setTokens(res);
    authStore.set(res);
  };

  const isTokenExpired = () => !!(auth?.exp && auth?.exp <= Date.now() / 1000);

  const isAuthenticated = () => {
    if (!tokens?.token) {
      return false;
    }

    if (isTokenExpired()) {
      return false;
    }

    return true;
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      try {
        setAuthState(null);
        setTokens(null);
        authStore.clear();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
