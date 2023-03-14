import { Outlet } from 'react-router-dom';
import { Container } from '../Container';
import { Header } from '../Header';
import { Theme } from '../Theme';
import { SideBar } from '../SideBar';
import { Wrapp } from './styled';

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Wrapp>
          <SideBar />
          <Outlet />
        </Wrapp>
        <Theme />
      </Container>
    </>
  );
};
