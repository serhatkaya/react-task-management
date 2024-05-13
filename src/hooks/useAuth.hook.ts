import { useContext } from 'react';
import AuthContext from '../providers/AuthProvider';
import { IAuthContext } from '../types/auth.i';

const useAuth = (): IAuthContext => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};

export default useAuth;
