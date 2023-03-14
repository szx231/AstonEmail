import { Navigate, Outlet } from 'react-router-dom';
import { useGetUser } from '../../hooks/useGetUser';

export const ProtectedRoutes = () => {
  const user = useGetUser();

  return user.username ? <Outlet /> : <Navigate to="/Authorization/SignIn" />;
};
