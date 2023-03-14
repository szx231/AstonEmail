import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { messageCategoryImage } from '../../helpers/MessageCategoryImage';
import { messageSentToday } from '../../helpers/MessageSentToday';

import { ReactComponent as ImportantImage } from '../../assets/important.svg';
import { ReactComponent as BookMarkImage } from '../../assets/bookmark.svg';
import { ReactComponent as AttachImage } from '../../assets/attach.svg';

import {
  Attach,
  BookmarkWrapp,
  Category,
  Description,
  ImportantWrapp,
  MessageDate,
  Name,
  Title,
  Tr,
  Text,
  ElementIndex,
  CategoryEmpty,
} from './styled';
import { encryption } from '../../helpers/Encryption';
import { uniqueIdAdd } from '../../store/CurrentMessageUniqueId';
import { useAppDispatch } from '../../store/hooks';

import { EmailCardType } from './types';

export interface Doc {
  img: string;
}

interface FavoriteMessageCardProps {
  name: string;
  messageIsImportant: boolean;
  messageIsBookMark: boolean;
  title: string;
  description: string;
  messageCategory: string | undefined;
  attach: Doc | undefined;
  serverMessageDate: string;
  read: boolean;
  index: number;
  message: EmailCardType;
}

export const FavoriteMessageCard: FC<FavoriteMessageCardProps> = React.memo((props) => {
  const {
    name,
    messageIsImportant,
    messageIsBookMark,
    title,
    description,
    messageCategory,
    attach,
    serverMessageDate,
    read,
    index,
    message,
  } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const redirectToPage = (messageObject: EmailCardType) => {
    const userEmail = messageObject.author.email;
    const hashEmail = encryption(userEmail);

    dispatch(uniqueIdAdd(hashEmail));

    const address = `Mail/message/${hashEmail}`;
    return navigate(address);
  };

  return (
    <Tr onClick={() => redirectToPage(message)}>
      <ElementIndex>{index}</ElementIndex>
      <Name messageIsRead={read}>{name}</Name>
      <ImportantWrapp>{messageIsImportant && <ImportantImage />}</ImportantWrapp>
      <BookmarkWrapp>{messageIsBookMark && <BookMarkImage />}</BookmarkWrapp>
      <Text>
        <Title messageIsRead={read}>{title}</Title>
        <Description>{description}</Description>
      </Text>
      {messageCategory ? (
        <Category>{messageCategoryImage(messageCategory)}</Category>
      ) : (
        <CategoryEmpty>Category</CategoryEmpty>
      )}
      <Attach>{attach && <AttachImage />}</Attach>
      {serverMessageDate && <MessageDate>{messageSentToday(serverMessageDate)}</MessageDate>}
    </Tr>
  );
});

FavoriteMessageCard.propTypes = {
  name: PropTypes.string.isRequired,
  messageIsImportant: PropTypes.bool.isRequired,
  messageIsBookMark: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  messageCategory: PropTypes.string.isRequired,
  attach: PropTypes.shape({
    img: PropTypes.string.isRequired,
  }),
  serverMessageDate: PropTypes.string.isRequired,
  read: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
