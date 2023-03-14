import styled from '@emotion/styled';

type TDotMessageStatus = {
  messageIsRead: boolean;
};

type TAvatar = {
  image: string;
};

type TPicture = {
  image: string;
};

export const Wrapp = styled.div`
  margin: 0px 12px;
  background-color: var(--messages-body-color);
  border-radius: 12px;
  padding: 16px 32px;
  width: 100%;
`;

export const Container = styled.div`
  background-color: var(--messages-body-color);
  color: var(--current-message-title-text);
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const TitleText = styled.h2`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--current-message-title-text);
`;

export const FlagWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const FlagText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
`;

export const FlagImage = styled.div`
  display: flex;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Person = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const DateAndNameWrapp = styled.div`
  display: flex;
`;

export const Dot = styled.div<TDotMessageStatus>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => (props.messageIsRead ? 'transparent' : '#005ff9')};
  margin-right: 9px;
  margin-left: -16px;
  flex-shrink: 0;
`;

export const Avatar = styled.div<TAvatar>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  flex-shrink: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.image});
  margin-right: 12px;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AddresseesInfoWrapp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Name = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  white-space: nowrap;
  margin-right: 8px;
`;

export const MessageDate = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: var(--message-date-color);
  margin-right: 17px;
`;

export const AvatarSkeleton = styled.td``;

export const FirstLetterNicname = styled.div`
  border-radius: 50%;
  border: none;
  color: 'blue';
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 32px;
  height: 32px;
  background-color: #ffb980;
`;

export const Important = styled.div``;

export const Addressees = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: var(--message-date-color);
`;

export const AttachedPictures = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const DownloadImageContainer = styled.div`
  background: var(--download-image-button);
  width: 100%;
  padding: 14px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0%;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease-in-out;
`;

export const DownloadImagesButton = styled.div`
  border: none;
  background-color: transparent;
`;

export const Picture = styled.div<TPicture>`
  width: 256px;
  height: 190px;
  background-image: url(${(props) => props.image});
  border-radius: 12px;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  cursor: pointer;

  &&:hover ${DownloadImageContainer} {
    opacity: 1;
  }
`;

export const AttachedFiles = styled.div`
  display: flex;
`;

export const AttachedFilesCount = styled.div`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  margin-right: 16px;
`;

export const AttachedFilesDownload = styled.button`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #005bd1;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export const AttachedFilesDownloadSize = styled.div`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
`;

export const MessageDescription = styled.h3`
  font-family: 'Helvetica Neue';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;
  margin-top: 28px;
`;

export const DownloadImageWrapper = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;
`;

export const DownloadImageText = styled.div`
  color: var(--text-color);
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
`;
