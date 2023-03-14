import styled from '@emotion/styled';

type IItem = {
  currentItem: boolean;
};

export const Items = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-bottom: 8px;
`;

export const Item = styled.button<IItem>`
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: ${(props) => (props.currentItem ? 700 : 400)};
  background-color: ${(props) => (props.currentItem ? 'var(--current-message-background-color)' : 'transparent')};
  cursor: pointer;
  border: none;
  color: var(--text-color);
  padding: 8px 16px;
  border-radius: 8px;
  width: 100%;
`;

export const Image = styled.div`
  height: 20px;
  width: 20px;
`;

export const Text = styled.li`
  font-family: 'Arial';
  font-style: normal;
  font-size: 15px;
  line-height: 20px;
  color: var(--text-color);
`;
