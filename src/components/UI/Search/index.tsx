import debounce from 'lodash.debounce';
import React, { FC, useEffect, useState } from 'react';

import { Wrapp, Input, LoopWrap, ButtonClear, ButtonSearch } from './styled';

import { ReactComponent as Loop } from '../../../assets/Search/loop.svg';
import { ReactComponent as Close } from '../../../assets/Search/close.svg';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { inputChangeValue, removeInputField } from '../../../store/Search';

import { useGetTheme } from '../../../hooks/useGetTheme';
import { selectInputValue } from '../../../store/Selectors';

export interface Event {
  type: string;
  key?: string;
}

interface SearchProps {
  reFetchData: (e: Event) => void;
  clearInputRefetchData: () => void;
}

export const Search: FC<SearchProps> = ({ reFetchData, clearInputRefetchData }) => {
  const [inputValueComponent, setInputValueComponent] = useState('');
  const { inputValue } = useAppSelector(selectInputValue);
  const dispatch = useAppDispatch();
  const [theme] = useGetTheme();

  const changeInputValue = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputChangeValue(e.target.value));
  }, 200);

  useEffect(() => {
    setInputValueComponent(inputValue);
  }, [inputValue]);

  return (
    <Wrapp onSubmit={(e) => e.preventDefault()}>
      <Input
        theme={theme}
        value={inputValueComponent}
        onChange={(e) => {
          changeInputValue(e);
          setInputValueComponent(e.target.value);
        }}
        placeholder="Поиск писем..."
        onKeyDown={reFetchData}
      />
      <LoopWrap>
        <Loop />
      </LoopWrap>
      {inputValue && (
        <>
          <ButtonClear
            onClick={() => {
              dispatch(removeInputField());
              setInputValueComponent('');
            }}
          >
            <Close onClick={clearInputRefetchData} />
          </ButtonClear>
          <ButtonSearch onClick={reFetchData} type="button">
            <Loop />
          </ButtonSearch>
        </>
      )}
    </Wrapp>
  );
};
