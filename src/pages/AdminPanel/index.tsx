import { useEffect } from 'react';
import { Button } from 'antd';

import { useGetTheme } from '../../hooks/useGetTheme';

import { useLazyGetUsersInfoQuery } from '../../store/EmailsApi';
import { Container, Thead, Table, Tbody, Td, TrThead, ButtonsContainer } from './styled';
import { UserCard } from './UserCard';

import { addFilterStatus } from '../../store/FilterUsersStatus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUsersSorted } from '../../store/Selectors';

interface User {
  user_id: number;
  username: string;
  surname: string;
  email: string;
  created_on: string;
}

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersSorted);
  const [reFetchUsers, { data = [], isFetching, isError, isSuccess, error }] = useLazyGetUsersInfoQuery();
  const [theme] = useGetTheme();

  useEffect(() => {
    reFetchUsers();
  }, []);

  const headerTitles = [
    { name: 'id' },
    { name: 'username' },
    { name: 'surname' },
    { name: 'email' },
    { name: 'dateCreate' },
  ];

  return (
    <Container>
      {isError && error?.originalStatus === 500 && <div>Что-то пошло не так, попробуйте позже!</div>}
      {isError && error?.originalStatus === 403 && <div>Error: {error.data}</div>}
      {isFetching && <div>loading...</div>}
      {data && isSuccess && (
        <>
          <ButtonsContainer>
            <Button onClick={() => dispatch(addFilterStatus('NUMBER'))} type="primary">
              ID
            </Button>
            <Button onClick={() => dispatch(addFilterStatus('AZ'))} type="primary">
              AZ
            </Button>
            <Button onClick={() => dispatch(addFilterStatus('ZA'))} type="primary">
              ZA
            </Button>
          </ButtonsContainer>
          <Table theme={theme}>
            <Thead theme={theme}>
              <TrThead>
                {headerTitles.map(({ name }) => (
                  <Td key={name}>{name}</Td>
                ))}
              </TrThead>
            </Thead>
            <Tbody>
              {users.map((el: User) => {
                return (
                  <UserCard
                    key={el.email}
                    email={el.email}
                    username={el.username}
                    surname={el.surname}
                    user_id={el.user_id}
                    created_on={el.created_on}
                  />
                );
              })}
            </Tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default AdminPanel;
