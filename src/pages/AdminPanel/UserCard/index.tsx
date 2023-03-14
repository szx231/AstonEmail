import PropTypes from 'prop-types';
import { FC } from 'react';
import { useGetTheme } from '../../../hooks/useGetTheme';
import { TrTable, Td } from './styled';

interface IUserCardProps {
  user_id: number;
  username: string;
  surname: string;
  email: string;
  created_on: string;
}

export const UserCard: FC<IUserCardProps> = (props) => {
  const { user_id, username, surname, email, created_on } = props;
  const [theme] = useGetTheme();

  return (
    <TrTable theme={theme}>
      <Td>{user_id}</Td>
      <Td>{username}</Td>
      <Td>{surname}</Td>
      <Td>{email}</Td>
      <Td>{created_on}</Td>
    </TrTable>
  );
};

UserCard.propTypes = {
  user_id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  created_on: PropTypes.string.isRequired,
};
