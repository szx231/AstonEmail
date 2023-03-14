import styled from '@emotion/styled';

type IButton = {
  theme: string;
};

export const Button = styled.button<IButton>`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: #333333;
  padding: 8px 34px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 12px;
  white-space: nowrap;
  cursor: pointer;
  border: ${(props) =>
    props.theme === 'светлая' ? `1px solid rgba(0, 16, 61, 0.12)` : `1px solid rgba(0, 0, 0, 0.4)`};
`;
