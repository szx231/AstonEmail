import { useEffect } from 'react';
import { userIsAuth } from '../../store/Authorization/CheckUserIsAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsAuth } from '../../store/Selectors';

export const useAthorization = () => {
  const dispatch = useAppDispatch();
  const { user, status, errorText, codeStatus } = useAppSelector(selectIsAuth);

  useEffect(() => {
    dispatch(userIsAuth());
  }, []);

  return { user, status, errorText, codeStatus };
};
