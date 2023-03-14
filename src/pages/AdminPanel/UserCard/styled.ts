import styled from '@emotion/styled';

interface TableProps {
  theme: 'светлая' | 'тёмная';
}

export const Td = styled.td`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  padding: 10px;
  border-collapse: collapse;
  border: 1px solid #005ff9;
`;

export const Th = styled.th`
  text-align: center;
  padding: 10px;
`;

export const TrTable = styled.tr<TableProps>`
  color: ${(props) => (props.theme === 'светлая' ? '#000' : '#fff')};
  border-collapse: collapse;
  cursor: pointer;
  &:hover {
    background-color: grey;
    transition: all 0.3s ease-in-out;
  }
`;

export const TrThead = styled.tr`
  border-collapse: collapse;
`;
