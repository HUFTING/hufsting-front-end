import type { UserInfo } from '@/app/mate/management/page';
import { FollowerListItemStyle } from '@/styles/followerStyles';
import React from 'react';

interface props {
  user: UserInfo;
  onClickItem: () => void;
  right?: null | { icon: JSX.Element; onClick: () => void };
}

const MateListItem = ({ user, onClickItem, right }: props) => (
  <FollowerListItemStyle
    key={user.id}
    role="presentation"
    onClick={() => {
      onClickItem();
    }}
  >
    <div className="photo">{user.photo}</div>
    <div className="user">
      <div>
        <div>{user.name}</div>
        <div>{user.isFollowing ? user.profile : user.email}</div>
      </div>
      <div>{right !== undefined && right !== null ? right.icon : ''}</div>
    </div>
  </FollowerListItemStyle>
);

export default MateListItem;
