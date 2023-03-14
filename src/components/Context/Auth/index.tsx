import { createContext, FC, ReactNode } from 'react';
import { useAthorization } from '../../../hooks/useAthorization';

export interface User {
  username: string | null;
  surname: string;
  email: string;
  role_name: string;
}

interface AuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext<User>(null);

export const AuthorizationProvider: FC<AuthProvider> = ({ children }) => {
  const { user, status, errorText, codeStatus } = useAthorization();

  return (
    <>
      {(status === 'success' || codeStatus === 403) && (
        <AuthContext.Provider value={user || ''}>{children}</AuthContext.Provider>
      )}
      {status === 'loading' && <div>loading........</div>}
      {codeStatus === 500 && <div>{errorText}</div>}
    </>
  );
};
