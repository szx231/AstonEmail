import { useEffect } from 'react';
import { Wrapp, Text, Image, Contaier } from './styled';
import { ReactComponent as ThemeLight } from '../../assets/themeLight.svg';
import { ReactComponent as ThemeDark } from '../../assets/themeDark.svg';
import { useGetTheme } from '../../hooks/useGetTheme';

export const Theme = () => {
  const [theme, setTheme] = useGetTheme();
  const themeText = `Тема: ${theme}`;

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Wrapp>
      <Contaier onClick={setTheme}>
        <Image>{theme === 'светлая' ? <ThemeLight /> : <ThemeDark />}</Image>
        <Text theme>{themeText}</Text>
      </Contaier>
    </Wrapp>
  );
};
