'use client';

import MainHeader from '@/components/common/layout/MainHeader';
import SubHeader from '@/components/common/layout/SubHeader';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FollowerListPageStyle } from '@/styles/followerStyles';
import AddFollowingModal from '@/components/common/modal/AddFollowingModal';
import SelectMenuBar from '@/components/mate/SelectMenuBar';
import MateListItem from '@/components/mate/MateListItem';
import Image from 'next/image';
import BasicInput from '@/components/common/BasicInput';

type MatePageType = 'my-mate' | 'new-mate';
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  photo: string;
  profile: string;
  isFollowing: boolean;
}
// TODO yarn dev해야 hmr 가능이다.

const ManageMateList = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<UserInfo[] | null>(null);
  const [openModal] = useState(false);
  const [pageType, setPageType] = useState<MatePageType>('my-mate');

  const addFollowing = (value: string) => {
    // console.log(value);
  };

  const getUserList = useCallback((searchValue: string | null) => {
    // api 호출할 때 searchValue 넣기
    console.log(searchValue);

    setUserList([
      {
        id: 1,
        name: '임예람',
        email: 'email',
        photo:
          'https://phinf.pstatic.net/contact/20220224_279/1645675907154rcS3m_JPEG/profileImage.jpg?type=s80',
        profile: 'hi',
        isFollowing: true,
      },
      {
        id: 2,
        name: '김강민',
        email: 'email',
        photo:
          'https://phinf.pstatic.net/contact/20220224_279/1645675907154rcS3m_JPEG/profileImage.jpg?type=s80',
        profile: 'hi',
        isFollowing: false,
      },
      // { id: 3, name: '김재우', email: '', isFollowing: false },
      // { id: 4, name: '김예은', email: '', isFollowing: false },
      // { id: 5, name: '원동현', email: '', isFollowing: false },
      // { id: 6, name: '설희관', email: '', isFollowing: false },
      // { id: 7, name: '조성민', email: '', isFollowing: false },
    ]);
  }, []);

  const changeMateState = useCallback(
    (user: UserInfo) => {
      const copiedUserList = JSON.parse(JSON.stringify(userList));
      const clickedMate = copiedUserList?.find(
        (copiedUser: UserInfo) => copiedUser.id === user.id,
      );
      clickedMate.isFollowing = clickedMate.isFollowing !== true;
      setUserList(copiedUserList);
    },
    [userList],
  );

  useEffect(() => {
    getUserList(null);
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

      <div className="w-[90%] mb-4 mx-auto">
        <BasicInput
          placeholder="이름 또는 이메일 입력"
          changeHandler={e => {
            getUserList(e.target.value);
          }}
        />
      </div>

      <section
        className="w-[90%] rounded-t-3xl bg-[#F3F5F7] mx-auto flex flex-col items-center px-4 flex-grow"
        style={{ boxShadow: '0px -2px 5px 3px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="bg-[#C8C8C8] w-12 h-2 rounded-3xl my-4" />
        <div className="font-bold text-xl mb-2">
          {pageType === 'my-mate' ? (
            <span className="text-[#FF6869]">훕팅 메이트</span>
          ) : (
            <>
              <span className="text-[#FF6869]">훕팅 메이트</span>를 확인해보세요
            </>
          )}
        </div>

        <section className="w-full flex flex-grow flex-col overflow-auto">
          {userList?.map(user => {
            if (
              (pageType === 'my-mate' && user.isFollowing) ||
              pageType === 'new-mate'
            ) {
              return (
                <MateListItem
                  key={user.id}
                  user={user}
                  onClickItem={() => {
                    if (pageType === 'my-mate') {
                      if (user.isFollowing) {
                        router.push('/profile');
                      } else {
                        // eslint-disable-next-line no-alert
                        alert('서로 파트너여야만 프로필 조회가 가능합니다');
                      }
                    }
                  }}
                  right={
                    pageType === 'my-mate'
                      ? null
                      : {
                          icon: user.isFollowing ? (
                            <Image
                              src="/check.svg"
                              width={24}
                              height={24}
                              alt="my-mate-icon"
                            />
                          ) : (
                            <Image
                              src="/Plus.svg"
                              width={24}
                              height={24}
                              alt="add-mate-icon"
                            />
                          ),
                          onClick: () => {
                            changeMateState(user);
                          },
                        }
                  }
                />
              );
            }
            return '';
          })}
        </section>
      </section>
      {openModal && <AddFollowingModal addEvent={addFollowing} />}
    </FollowerListPageStyle>
  );
};

export default ManageMateList;
