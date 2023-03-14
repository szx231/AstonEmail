import { LogoutOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchLogOut } from '../../store/LogOut';
import { selectLogOut } from '../../store/Selectors';

export const LogOut = () => {
  const dispatch = useAppDispatch();
  const { statusLogOut } = useAppSelector(selectLogOut);

  useEffect(() => {
    if (statusLogOut === 'success') window.location.reload();
  }, [statusLogOut]);

  return <LogoutOutlined onClick={() => dispatch(fetchLogOut())} style={{ fontSize: '24px', color: 'blue' }} />;
};
