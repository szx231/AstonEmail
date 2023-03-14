import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import React, { FC } from 'react';

interface Favorite {
  count: number;
}

export const FavoriteBadge: FC<Favorite> = React.memo(({ count }) => (
  <Space style={{ cursor: 'pointer' }} size={24}>
    <Badge count={count}>
      <Avatar shape="square" icon={<UserOutlined />} />
    </Badge>
  </Space>
));
