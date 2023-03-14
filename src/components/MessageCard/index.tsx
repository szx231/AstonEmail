import React, { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { notification } from '../../helpers/Notification';
import { ReactComponent as ImportantImage } from '../../assets/important.svg';
import { ReactComponent as BookMarkImage } from '../../assets/bookmark.svg';
import { ReactComponent as AttachImage } from '../../assets/attach.svg';
import { ReactComponent as CheckBoxArrow } from '../../assets/checkBoxArrow.svg';

import { messageCategoryImage } from '../../helpers/MessageCategoryImage';
import {
  Tr,
  DotMessageStatus,
  Dot,
  ImportantWrapp,
  BookmarkWrapp,
  ImageWrapp,
  Image,
  Name,
  Text,
  Title,
  Description,
  Category,
  Attach,
  MessageDate,
  AvatarSkeleton,
  CategoryEmpty,
} from './styled';

import { firstLetterLowerCase } from '../../helpers/FirstLetterLowerCase';
import { useAppDispatch } from '../../store/hooks';
import { EmailCardType } from '../../store/EmailsApi/typed';

import { useAddMessageToFavoriteMutation } from '../../store/EmailsApi';
import { encryption } from '../../helpers/Encryption';
import { uniqueIdAdd } from '../../store/CurrentMessageUniqueId';
import { messageSentToday } from '../../helpers/MessageSentToday';

interface MessageCardProps {
  imageProp: undefined | string;
  name: string;
  title: string;
  description: string;
  messageCategory: string | undefined;
  attach: { img: string } | undefined;
  serverMessageDate: string | undefined;
  read: boolean;
  messageIsImportant: boolean;
  messageIsBookMark: boolean;
  message: EmailCardType;
  favoriteMeesage: boolean;
}

export const MessageCard: FC<MessageCardProps> = React.memo((props) => {
  const {
    imageProp,
    name,
    title,
    description,
    messageCategory,
    attach,
    serverMessageDate,
    read,
    messageIsImportant,
    messageIsBookMark,
    message,
    favoriteMeesage,
  } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [addFavorite, { data: favoriteMessages = [], isSuccess, isError }] = useAddMessageToFavoriteMutation();

  const messageIsMark = async (currentMessage: EmailCardType) => {
    const authorEmail = currentMessage.author.email;

    await addFavorite({ email: authorEmail }).unwrap();
  };

  const redirectToPage = (messageObject: EmailCardType, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    if (!event.target.id) {
      const userEmail = messageObject.author.email;
      const hashEmail = encryption(userEmail);

      dispatch(uniqueIdAdd(hashEmail));

      return navigate(`${searchParams}/message/${String(hashEmail)}`);
    }
    return null;
  };

  useEffect(() => {
    if (isSuccess) {
      notification('success', favoriteMessages.text);
    }
    if (isError) {
      notification('error', 'Упс, что-то пошло не так');
    }
  }, [favoriteMessages]);

  const checkBox = <CheckBoxArrow id="id" fill="#fff" color="#fff" />;

  return (
    <Tr onClick={(event) => redirectToPage(message, event)} messageIsRead={read} isChecked={favoriteMeesage}>
      <DotMessageStatus>
        <Dot messageIsRead={read} />
      </DotMessageStatus>
      <ImageWrapp id="id">
        {imageProp ? (
          <Image
            id="id"
            onClick={() => messageIsMark(message)}
            isChecked={favoriteMeesage}
            image={!favoriteMeesage && imageProp}
          >
            {favoriteMeesage && checkBox}
          </Image>
        ) : (
          <AvatarSkeleton id="id" onClick={() => messageIsMark(message)} isChecked={favoriteMeesage} image={imageProp}>
            {favoriteMeesage ? checkBox : firstLetterLowerCase(name)}
          </AvatarSkeleton>
        )}
      </ImageWrapp>
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
