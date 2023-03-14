import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Wrapp, Table, Tbody } from './styled';
import { EmailCardType, Event } from './types';

import { MessageCard } from '../../components/MessageCard';
import { Pagination } from '../../components/Pagination';

import { selectInputValue, selectCategory } from '../../store/Selectors';

import { useAppSelector } from '../../store/hooks';
import { Search } from '../../components/UI/Search';
import { useLazyGetFavoriteListQuery, useLazyGetAllEmailsQuery } from '../../store/EmailsApi';

const Mail = () => {
  const { category } = useAppSelector(selectCategory);
  const { inputValue } = useAppSelector(selectInputValue);

  const [fetchEmails, { data = [], isError, isSuccess, isLoading }] = useLazyGetAllEmailsQuery();
  const [fetchFavoriteList, { data: favoriteMessageList = [], isSuccess: isSuccessFavorite }] =
    useLazyGetFavoriteListQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = inputValue.length ? inputValue : searchParams.get('search') || '';

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = (dataMessages: EmailCardType[]) => {
    return dataMessages.slice(itemOffset, endOffset);
  };

  const pageCount = (dataMessages: EmailCardType[]) => {
    return Math.ceil(dataMessages.length / itemsPerPage);
  };

  const changePageNumber = (event: { selected: number }) => {
    const buttonNumber = event.selected;
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setCurrentPage(buttonNumber);
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setCurrentPage(() => {
      return 0;
    });
    setItemOffset(() => {
      return 0;
    });
  }, [category]);

  useEffect(() => {
    if (inputValue.length || querySearch.length) {
      setSearchParams({
        category,
        page: String(currentPage + 1),
        search: inputValue.length ? inputValue : querySearch,
      });
    } else {
      setSearchParams({ category, page: String(currentPage + 1) });
    }
  }, [currentPage, category, inputValue]);

  useEffect(() => {
    fetchFavoriteList();
    fetchEmails({ category, querySearch });
  }, [category]);

  const reFetchData = useCallback(
    (e: Event) => {
      if (inputValue.length > 0) {
        if (e.key === 'Enter' || e.type === 'click') {
          fetchEmails({ category, querySearch });
        }
      }
    },
    [category, inputValue],
  );

  const clearInputRefetchData = useCallback(() => {
    const querySearch = '';
    fetchEmails({ category, querySearch });
  }, []);

  const favorteEmails = useMemo(() => {
    return favoriteMessageList.reduce((acc: string[], c: EmailCardType) => {
      acc.push(c.author.email);
      return acc;
    }, []);
  }, [favoriteMessageList]);

  const messageIncludesInFavorite = (currentUserEmail: string) => {
    return favorteEmails.includes(currentUserEmail);
  };

  return (
    <Wrapp>
      {isError && <div>Ошибка</div>}
      {isLoading && <div>loading</div>}
      {data && isSuccessFavorite && (
        <>
          <Search reFetchData={reFetchData} clearInputRefetchData={clearInputRefetchData} />
          <Table>
            <Tbody>
              {currentItems(data).map((el: EmailCardType) => {
                return (
                  <MessageCard
                    favoriteMeesage={messageIncludesInFavorite(el.author.email)}
                    key={el.author.email}
                    imageProp={el.author.avatar && el.author.avatar}
                    name={`${el.author.name} ${el.author.surname}`}
                    title={el.title}
                    description={el.text}
                    read={el.read}
                    messageCategory={el.flag && el.flag}
                    serverMessageDate={el.date && el.date}
                    attach={el.doc}
                    messageIsImportant={el.important}
                    messageIsBookMark={el.bookmark}
                    message={el}
                  />
                );
              })}
              {isSuccess && data.length === 0 && <div>Ничего не найдено</div>}
            </Tbody>
          </Table>
          {data.length > 5 && (
            <Pagination handlePageClick={changePageNumber} pageCount={pageCount(data)} currentPage={currentPage} />
          )}
        </>
      )}
    </Wrapp>
  );
};

export default Mail;
