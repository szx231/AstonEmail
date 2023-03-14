import { Wrapp, Text } from './styled';
import { ReactComponent as Plus } from '../../../assets/Shape.svg';
import { useGetTheme } from '../../../hooks/useGetTheme';

export const NewFolder = () => {
  const [theme] = useGetTheme();

  return (
    <Wrapp theme={theme}>
      <Plus fill="var(--newFolder-color)" />
      <Text>Новая папка</Text>
    </Wrapp>
  );
};
