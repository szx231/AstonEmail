import { useState } from 'react';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { Button } from 'antd';
import { ReactComponent as ImportantImage } from '../../assets/important.svg';
import { ReactComponent as DownloadImageArrow } from '../../assets/downloadImageArrow.svg';

import {
  Wrapp,
  Container,
  Title,
  TitleText,
  FlagWrapper,
  FlagText,
  FlagImage,
  Card,
  Person,
  AvatarSkeleton,
  FirstLetterNicname,
  AddresseesInfoWrapp,
  Dot,
  Avatar,
  TextContainer,
  Name,
  MessageDate,
  Important,
  Addressees,
  AttachedPictures,
  Picture,
  AttachedFiles,
  AttachedFilesCount,
  AttachedFilesDownload,
  DownloadImagesButton,
  DownloadImageContainer,
  DownloadImageWrapper,
  DownloadImageText,
  MessageDescription,
} from './styled';

import { firstLetterLowerCase } from '../../helpers/FirstLetterLowerCase';
import { messageCategoryImage } from '../../helpers/MessageCategoryImage';
import { convertBytes } from '../../helpers/ConvertBytes';

import { useAppSelector } from '../../store/hooks';
import { useGetEmailQuery } from '../../store/EmailsApi';
import { useGetFeatureFlagStatus } from '../../hooks/useGetFutureFlag';
import { selectСurrentMessageUniqueId } from '../../store/Selectors';
import { UserMessage } from './types';
import { messageSentToday } from '../../helpers/MessageSentToday';

const CurrentMessage = () => {
  // eslint-disable-next-line no-restricted-globals
  const encodedURL = encodeURIComponent(location.href);
  const telegramURL = `https://telegram.me/share/url?url=${encodedURL}`;

  const [zip] = useState(new JSZip());
  const [blobSizes, setBlobSize] = useState('');
  const { featureFlagStatus } = useGetFeatureFlagStatus();

  const { email } = useAppSelector(selectСurrentMessageUniqueId);

  const { data: message, isLoading, isError, isSuccess } = useGetEmailQuery(email);

  const downloadImage = async () => {
    const images = Object.values(message.doc);

    for (let i = 0; i < images.length; i++) {
      const res = await fetch(images[i]);
      const blob = await res.blob();
      zip.file(`image ${i}.jpeg`, blob, { base64: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });

    saveAs(content, 'images.zip');
  };

  const sumImagesSize = async () => {
    let generalSize = 0;
    const images = message?.doc;

    await Promise.all(
      Object.values(images).map(async (el) => {
        const result = await fetch(el);
        const sizeImages = (await result.blob()).size;
        return (generalSize += sizeImages);
      }),
    );
    return setBlobSize(convertBytes(generalSize));
  };

  sumImagesSize();

  const adressees = (data: UserMessage[]) => {
    const startString = 'Кому: Вы, ';
    const countsUsersShow = 3;
    const more = `ещё ${data.length - countsUsersShow} получателей`;

    if (data.length > countsUsersShow) {
      const users = data
        .filter((_, index) => index < countsUsersShow)
        .map((el) => {
          return ` ${el.name} ${el.surname}`;
        });
      return `${startString} ${users} ${more}`;
    }

    const users = data.map((el) => ` ${el.name} ${el.surname}`);
    return startString + users;
  };

  const renderPictures = (data: { img: string }) => {
    return Object.values(data).map((el) => {
      return (
        <DownloadImagesButton key={el.slice(0, 10)} onClick={downloadImage}>
          <Picture image={el}>
            <DownloadImageContainer>
              <DownloadImageWrapper>
                <DownloadImageArrow stroke="var(--text-color)" fill="var(--text-color)" />
                <DownloadImageText>Скачать</DownloadImageText>
              </DownloadImageWrapper>
            </DownloadImageContainer>
          </Picture>
        </DownloadImagesButton>
      );
    });
  };

  const filesCount = (data: { img: string }) => {
    const dataLength = Object.entries(data).length;

    if (dataLength === 1) return `${dataLength} файл`;
    if (dataLength < 5) return `${dataLength} файла`;

    return `${dataLength} файлов`;
  };

  return (
    <Wrapp>
      {isLoading && <div>loading....</div>}
      {isError && <div>error...</div>}
      <Container>
        {isSuccess && (
          <>
            <Title>
              <TitleText>{message.title}</TitleText>
              <FlagWrapper>
                <FlagText>{message.flag}</FlagText>
                {message.flag && <FlagImage>{messageCategoryImage(message.flag)}</FlagImage>}
              </FlagWrapper>
            </Title>
            <Card>
              <Person>
                <Dot messageIsRead={false} />
                {message?.author?.avatar ? (
                  <Avatar image={message.author.avatar} />
                ) : (
                  <AvatarSkeleton>
                    <FirstLetterNicname>{firstLetterLowerCase(message.author.name)}</FirstLetterNicname>
                  </AvatarSkeleton>
                )}
                <AddresseesInfoWrapp>
                  <TextContainer>
                    <Name>{`${message.author.name} ${message.author.surname}`}</Name>
                    {message.date && <MessageDate>{messageSentToday(message.date)}</MessageDate>}
                    <Important>{message.important && <ImportantImage />}</Important>
                  </TextContainer>
                  <Addressees>{adressees(message.to)}</Addressees>
                </AddresseesInfoWrapp>
              </Person>
              {message.doc && (
                <>
                  <AttachedPictures>{renderPictures(message.doc)}</AttachedPictures>
                  <AttachedFiles>
                    <AttachedFilesCount>{filesCount(message.doc)}</AttachedFilesCount>
                    <AttachedFilesDownload
                      onClick={downloadImage}
                    >{`Скачать все файлы (${blobSizes})`}</AttachedFilesDownload>
                  </AttachedFiles>
                </>
              )}
              <MessageDescription>{message.text}</MessageDescription>
            </Card>
          </>
        )}
        {featureFlagStatus && isSuccess && (
          <a target="_blank" rel="noopener noreferrer" href={telegramURL}>
            <Button type="primary" size="large">
              Поделиться ссылкой в Telegram
            </Button>
          </a>
        )}
      </Container>
    </Wrapp>
  );
};

export default CurrentMessage;
