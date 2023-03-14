import React, { FC } from 'react';
import { Wrapp } from './styled';

interface IContainer {
  children: React.ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
  return <Wrapp>{children}</Wrapp>;
};
