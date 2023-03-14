import { ReactComponent as LogoImg } from '../../assets/logoImage.svg';
import { ReactComponent as LogoTextDark } from '../../assets/logoTextDark.svg';
import { ReactComponent as LogoTextLight } from '../../assets/logoTextLight.svg';
import { useGetTheme } from '../../hooks/useGetTheme';
import { Wrapp } from './styled';

export const Logo = () => {
  const [theme] = useGetTheme();

  return (
    <Wrapp>
      <LogoImg />
      {theme === 'светлая' ? <LogoTextLight /> : <LogoTextDark />}
    </Wrapp>
  );
};
