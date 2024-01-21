'use client';

import MainHeader from '@/components/common/layout/MainHeader';
import SubHeader from '@/components/common/layout/SubHeader';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FollowerListPageStyle } from '@/styles/followerStyles';
import AddFollowingModal from '@/components/common/modal/AddFollowingModal';
import SelectMenuBar from '@/components/mate/SelectMenuBar';
import MateListItem from '@/components/mate/MateListItem';

type MatePageType = 'my-mate' | 'new-mate';
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  photo: string;
  isFollowing: boolean;
}

const ManageMateList = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<UserInfo[] | null>(null);
  const [openModal] = useState(false);
  const [pageType, setPageType] = useState<MatePageType>('my-mate');

  const addFollowing = (value: string) => {
    // console.log(value);
  };

  const getUserList = () => {
    setUserList([
      { id: 1, name: '임예람', email: 'email', photo: '..', isFollowing: true },
      {
        id: 2,
        name: '김강민',
        email: 'email',
        photo: '..',
        isFollowing: false,
      },
      // { id: 3, name: '김재우', email: '', isFollowing: false },
      // { id: 4, name: '김예은', email: '', isFollowing: false },
      // { id: 5, name: '원동현', email: '', isFollowing: false },
      // { id: 6, name: '설희관', email: '', isFollowing: false },
      // { id: 7, name: '조성민', email: '', isFollowing: false },
    ]);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <FollowerListPageStyle>
      <MainHeader />
      <SubHeader title="훕팅 메이트" />

      <SelectMenuBar
        menuList={[
          {
            id: 'my-mate',
            title: '메이트 관리',
            onClick: menuObj => {
              setPageType(menuObj.id as MatePageType);
            },
          },
          {
            id: 'new-mate',
            title: '메이트 추가',
            onClick: menuObj => {
              setPageType(menuObj.id as MatePageType);
            },
          },
        ]}
        pickedMenuId={pageType}
      />

      {pageType === 'my-mate' ? (
        <div className="pr-2">
          메이트 {userList !== null ? userList.length : 0}
        </div>
      ) : (
        <div>검색</div>
      )}

      <section
        className="w-[90%] rounded-t-3xl bg-[#F3F5F7] mx-auto flex flex-col items-center px-4"
        style={{ boxShadow: '0px -2px 5px 3px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="bg-[#C8C8C8] w-12 h-2 rounded-3xl my-4" />
        <div className="font-bold text-xl">
          {pageType === 'my-mate' ? (
            ''
          ) : (
            <>
              <span className="text-[#FF6869]">훕팅 메이트</span>를 확인해보세요
            </>
          )}
        </div>

        {pageType === 'my-mate' ? (
          userList?.map(user => (
            <MateListItem
              key={user.id}
              user={user}
              onClickItem={() => {
                if (user.isFollowing) {
                  // 유저 상세 페이지로 이동
                  router.push('/');
                } else {
                  alert('서로 파트너여야만 프로필 조회가 가능합니다');
                }
              }}
            />
            // <FollowerListItemStyle
            //
            //   role="presentation"
            //   onClick={() => {
            //     if (user.isFollowing) {
            //       // 유저 상세 페이지로 이동
            //       router.push('/');
            //     } else {
            //       alert('서로 파트너여야만 프로필 조회가 가능합니다');
            //     }
            //   }}
            // >
            //   <div>{user.photo}</div>
            //   <div>
            //     <div>{user.name}</div>
            //     <div>{user.email}</div>
            //   </div>
            //   <div>플러스</div>
            // </FollowerListItemStyle>
          ))
        ) : (
          <div>new</div>
        )}
      </section>
      {/* <section
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
      
      </section> */}
      {openModal && <AddFollowingModal addEvent={addFollowing} />}
    </FollowerListPageStyle>
  );
};

export default ManageMateList;
