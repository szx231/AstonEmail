import { useContext } from 'react';
import { AuthContext } from '../../components/Context/Auth';

export const useGetUser = () => {
  const { username, surname, email, role_name } = useContext(AuthContext);

  return { username, surname, email, role_name };
};
