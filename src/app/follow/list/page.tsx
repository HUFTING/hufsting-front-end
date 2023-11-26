'use client';

import MainHeader from '@/components/common/layout/MainHeader';
import SubHeader from '@/components/common/layout/SubHeader';
import FollowIcon from '@/components/common/ui/FollowIcon';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FollowerListItemStyle,
  FollowerListPageStyle,
} from '@/styles/followerStyles';

const UserListPage = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<Array<{
    id: number;
    name: string;
    isFollowing: boolean;
  }> | null>(null);

  const addFollowing = () => {
    console.log('');
  };

  const getUserList = () => {
    setUserList([
      { id: 1, name: '예람', isFollowing: true },
      { id: 2, name: '세현', isFollowing: false },
    ]);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <FollowerListPageStyle>
      <MainHeader />
      <SubHeader title="훕팅 파트너" />
      <section
        role="presentation"
        className="add-follower"
        onClick={addFollowing}
      >
        파트너 추가
        <FollowIcon />
      </section>
      <section className="list">
        {userList?.map(user => (
          <FollowerListItemStyle
            key={user.id}
            role="presentation"
            onClick={() => {
              if (user.isFollowing) {
                // 유저 상세 페이지로 이동
                router.push('/');
              } else {
                alert('서로 파트너여야만 프로필 조회가 가능합니다');
              }
            }}
          >
            {user.name}
          </FollowerListItemStyle>
        ))}
      </section>
    </FollowerListPageStyle>
  );
};

export default UserListPage;
