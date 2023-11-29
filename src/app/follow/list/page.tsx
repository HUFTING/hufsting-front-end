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
import AddFollowingModal from '@/components/common/modal/AddFollowingModal';

const UserListPage = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<Array<{
    id: number;
    name: string;
    isFollowing: boolean;
  }> | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const addFollowing = (value: string) => {
    console.log(value);
  };

  const getUserList = () => {
    setUserList([
      { id: 1, name: '임예람', isFollowing: true },
      { id: 2, name: '김강민', isFollowing: false },
      { id: 3, name: '김재우', isFollowing: false },
      { id: 4, name: '김예은', isFollowing: false },
      { id: 5, name: '원동현', isFollowing: false },
      { id: 6, name: '설희관', isFollowing: false },
      { id: 7, name: '조성민', isFollowing: false },
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
        onClick={() => {
          setOpenModal(true);
        }}
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
      {openModal && <AddFollowingModal addEvent={addFollowing} />}
    </FollowerListPageStyle>
  );
};

export default UserListPage;
