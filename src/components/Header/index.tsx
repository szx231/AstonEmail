import { TeamOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { Logo } from '../Logo';

import { Head, BlockInfo, UserName } from './styled';

import { FavoriteBadge } from '../UI/FavoriteBadge';
import { LogOut } from '../LogOut';

import { useGetUser } from '../../hooks/useGetUser';

import { useGetFavoriteListQuery } from '../../store/EmailsApi';

export const Header = () => {
  const { data = [] } = useGetFavoriteListQuery();
  const user = useGetUser();

  return (
    <Head>
      <Link to="/Mail">
        <Logo />
      </Link>
      <BlockInfo>
        {user.username && (
          <UserName>
            Добро пожаловать <strong>{user.username}</strong>
          </UserName>
        )}
        <Link to="/adminPanel">
          <TeamOutlined style={{ fontSize: '26px', color: 'red' }} />
        </Link>
        <Link to="/favoriteMessage">
          <FavoriteBadge count={data.length} />
        </Link>
        <LogOut />
      </BlockInfo>
    </Head>
  );
};
