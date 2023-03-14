import { useGetFavoriteListQuery } from '../../store/EmailsApi';

import { FavoriteMessageCard } from '../../components/FavoriteMessageCard';
import { NotFound, Table, Tbody, Wrapp } from './styled';

const FavoriteMessage = () => {
  const { data = [], isLoading, isError, isSuccess } = useGetFavoriteListQuery();

  if (isSuccess && data.length === 0) {
    return <NotFound>У вас нет избранных писем!</NotFound>;
  }

  return (
    <Wrapp>
      {isLoading && <div>loading...</div>}
      {isError && <div>Ошибка...</div>}
      <Table>
        {data && isSuccess && (
          <Tbody>
            {data.map((el, indexMessage: number) => (
              <FavoriteMessageCard
                message={el}
                name={`${el.author.name} ${el.author.surname}`}
                messageIsImportant={el.important}
                messageIsBookMark={el.bookmark}
                title={el.title}
                description={el.text}
                messageCategory={el.flag && el.flag}
                attach={el.doc && el.doc}
                serverMessageDate={el.date}
                read={el.read}
                index={indexMessage + 1}
              />
            ))}
          </Tbody>
        )}
      </Table>
    </Wrapp>
  );
};

export default FavoriteMessage;
