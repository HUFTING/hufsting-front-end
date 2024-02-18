import { FollowerListItemStyle } from '@/styles/followerStyles';
import React, { useCallback } from 'react';
import Image from 'next/image';
import { type MateInfo } from '@/types/user';

interface props {
  user: MateInfo;
  onClickItem: () => void;
  right?: null | { icon: JSX.Element; onClick: () => void };
}

const MateListItem = ({ user, onClickItem, right }: props) => {
  const addMateHandler = useCallback(() => {
    // 친추 api 발송
    right?.onClick();
  }, [user]);

  return (
    <FollowerListItemStyle
      key={user.id}
      role="presentation"
      onClick={() => {
        onClickItem();
      }}
    >
      <div className="photo">
        <Image src={user.photo} layout="fill" alt="mate-photo" />
      </div>
      <div className="user">
        <div>
          <div>{user.name}</div>
          <div>{user.content}</div>
        </div>
        <div
          role="presentation"
          onClick={() => {
            addMateHandler();
          }}
        >
          {right !== undefined && right !== null ? right.icon : ''}
        </div>
      </div>
    </FollowerListItemStyle>
  );
};

export default MateListItem;
