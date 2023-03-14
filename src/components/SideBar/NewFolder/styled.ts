import styled from '@emotion/styled';

type TWrapp = {
  theme: string;
};

export const Wrapp = styled.button<TWrapp>`
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-top: ${(props) =>
    props.theme === 'светлая' ? '1px solid rgba(0, 16, 61, 0.12) ' : '1px solid rgba(0, 0, 0, 0.4)'};
`;

export const Text = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: var(--newFolder-color);
`;
