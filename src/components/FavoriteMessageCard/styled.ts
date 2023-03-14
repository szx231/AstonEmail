import styled from '@emotion/styled';

type TName = {
  messageIsRead: boolean;
};

type TTitle = {
  messageIsRead: boolean;
};

export const Tr = styled.tr`
  transition: all var(--transition-time) ease-in-out;
  &:hover {
    background-color: var(--current-message-background-color);
  }
`;

export const CategoryEmpty = styled.div`
  opacity: 0;
`;

export const BorderWrapper = styled.td`
  border-bottom: 1px solid var(--message-border-color);
`;

export const DotMessageStatus = styled.td``;

export const ImportantWrapp = styled.td``;

export const BookmarkWrapp = styled.td``;

export const Name = styled.td<TName>`
  color: var(--text-color);
  font-family: 'Arial';
  font-style: normal;
  font-weight: ${(props) => (props.messageIsRead ? 400 : 700)};
  font-size: 15px;
  line-height: 20px;
  white-space: nowrap;
`;

export const Text = styled.td`
  width: 100%;
`;

export const ElementIndex = styled.td``;

export const Title = styled.td<TTitle>`
  color: var(--text-color);
  font-family: 'Arial';
  font-style: normal;
  font-weight: ${(props) => (props.messageIsRead ? 400 : 700)};
  font-size: 15px;
  line-height: 20px;
  white-space: nowrap;
  text-align: left;
  padding-right: 0px !important;
`;

export const Description = styled.td`
  color: var(--message-description-color);
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  width: 100%;
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Category = styled.td``;

export const Attach = styled.td``;

export const MessageDate = styled.td`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: var(--message-date-color);
  white-space: nowrap;
`;
