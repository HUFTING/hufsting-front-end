'use client';

import SubHeader from '@/components/common/layout/SubHeader';
import React, { useCallback, useEffect, useState } from 'react';
import { FollowerListPageStyle } from '@/styles/followerStyles';
import SelectMenuBar from '@/components/mate/SelectMenuBar';
import MateListItem from '@/components/mate/MateListItem';
import Image from 'next/image';
import BasicInput from '@/components/common/BasicInput';
import { followMateAPI, getMateListAPI, searchMateListAPI } from '@/api/mate';
import { type MateInfo } from '@/types/user';
import { toast } from 'react-toastify';

type MatePageType = 'my-mate' | 'new-mate';

const ManageMateList = () => {
  const [userList, setUserList] = useState<MateInfo[]>([]);
  const [pageType, setPageType] = useState<MatePageType>('my-mate');

  const getUserList = useCallback(async (searchValue: string | null) => {
    if (searchValue !== null) {
      const response = await searchMateListAPI(searchValue);
      if (response.id === null) {
        setUserList([]);
        toast.error('해당 이메일을 가진 메이트가 없습니다.');
      } else {
        setUserList([response]);
      }
    } else {
      const response = await getMateListAPI();
      setUserList(response);
    }
  }, []);

  const changeMateState = useCallback(
    async (user: MateInfo) => {
      const response = await followMateAPI(user.email);
      if (response) {
        const copiedUserList = JSON.parse(JSON.stringify(userList));
        const clickedMate = copiedUserList?.find(
          (copiedUser: MateInfo) => copiedUser.id === user.id,
        );
        clickedMate.isFollowing = clickedMate.isFollowing !== true;
        setUserList(copiedUserList);
      }
    },
    [userList],
  );

  const getText = useCallback(() => {
    if (pageType === 'my-mate') {
      return <span className="text-[#FF6869]">훕팅 메이트</span>;
    }

    if (pageType === 'new-mate' && userList?.length > 0) {
      return (
        <>
          <span className="text-[#FF6869]">훕팅 메이트</span>를 확인해보세요!
        </>
      );
    }

    return (
      <>
        <span className="text-[#FF6869]">메이트의 아이디</span>를 검색해보세요!
      </>
    );
  }, [userList, pageType]);

  useEffect(() => {
    if (pageType === 'my-mate') {
      void getUserList(null);
    }
  }, [pageType]);

  return (
    <FollowerListPageStyle>
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
              setUserList([]);
            },
          },
        ]}
        pickedMenuId={pageType}
      />

      <div className="w-[90%] mb-4 mx-auto">
        {pageType === 'new-mate' ? (
          <BasicInput
            placeholder="사용자 ID 검색"
            searchHandler={e => {
              void getUserList(e);
            }}
          />
        ) : (
          ''
        )}
      </div>

      <section
        className="w-[90%] rounded-t-3xl bg-[#F3F5F7] mx-auto flex flex-col items-center px-4 flex-grow"
        style={{ boxShadow: '0px -2px 5px 3px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="bg-[#C8C8C8] w-12 h-2 rounded-3xl my-4" />
        <div className="font-bold text-xl mb-2">{getText()}</div>

        <section className="w-full flex flex-grow flex-col overflow-auto">
          {userList?.map(user => (
            <MateListItem
              key={user.id}
              user={user}
              onClickItem={
                null
                //   () => {
                //   if (pageType === 'my-mate') {
                //     if (user.isFollowing) {
                //       router.push('/profile');
                //     } else {
                //       toast.info('서로 파트너여야만 프로필 조회가 가능합니다');
                //     }
                //   }
                // }
              }
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
                        void changeMateState(user);
                      },
                    }
              }
            />
          ))}
        </section>
      </section>
    </FollowerListPageStyle>
  );
};

export default ManageMateList;
