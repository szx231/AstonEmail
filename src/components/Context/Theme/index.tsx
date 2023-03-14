import { createContext, FC, ReactNode, useMemo } from 'react';
import { useToggleTheme } from '../../../hooks/useToggleTheme';

type Theme = 'светлая' | 'тёмная';

export interface ThemingContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemingContext = createContext<ThemingContextProps | null>(null);

export const ThemingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useToggleTheme('светлая');
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemingContext.Provider value={value}>{children}</ThemingContext.Provider>;
};
