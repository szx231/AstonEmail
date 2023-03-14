import styled from '@emotion/styled';

interface TableProps {
  theme: 'светлая' | 'тёмная';
}

export const Container = styled.div`
  padding: 0 15px;
  display: grid;
  width: 100%;
  max-width: 1200px;
  height: 50%;
`;

export const Thead = styled.thead<TableProps>`
  position: sticky;
  top: 0;
  background-color: #005ff9;
  font-weight: 800;
  color: #fff;
`;

export const Tbody = styled.tbody`
  color: #fff;
  color: #000;
`;

export const Table = styled.table<TableProps>`
  border-collapse: collapse;
  color: ${(props) => (props.theme === 'светлая' ? '#000' : '#fff')};
  width: 100%;
  background-color: ${(props) => (props.theme === 'светлая' ? '#fff' : '#000')};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  max-width: 150px;
  gap: 10px;
  margin-bottom: 30px;
`;

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
