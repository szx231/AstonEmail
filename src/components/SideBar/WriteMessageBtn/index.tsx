import { useGetTheme } from '../../../hooks/useGetTheme';
import { Button } from './styled';

export const WriteMessageBtn = () => {
  const [theme] = useGetTheme();

  return <Button theme={theme}>Написать письмо</Button>;
};
