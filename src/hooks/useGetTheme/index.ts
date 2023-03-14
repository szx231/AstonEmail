import { useContext } from 'react';
import { ThemingContext } from '../../components/Context/Theme';

export const useGetTheme = () => {
  const { theme, setTheme } = useContext(ThemingContext);

  return [theme, setTheme];
};
