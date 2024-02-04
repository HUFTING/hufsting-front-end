'use client';

import HuftingAlarmCard from '@/components/alarm/card/AlarmCard';
import FollowCard from '@/components/alarm/card/FollowCard';
import SelectMenuBar from '@/components/mate/SelectMenuBar';
import { useState } from 'react';

type ALARM_TYPE = 'hufting' | 'follow';

const AlarmSelectMenuBar = () => {
  const [pageType, setPageType] = useState<ALARM_TYPE>('hufting');

  return (
    <>
      <SelectMenuBar
        menuList={[
          {
            id: 'hufting',
            title: '훕팅 신청',
            onClick: menuObj => {
              setPageType(menuObj.id as ALARM_TYPE);
            },
          },
          {
            id: 'follow',
            title: '팔로우 신청',
            onClick: menuObj => {
              setPageType(menuObj.id as ALARM_TYPE);
            },
          },
        ]}
        pickedMenuId={pageType}
      />
      {pageType === 'hufting' ? (
        <HuftingAlarmCard type="new" date={new Date()} text="안녕" id="4" />
      ) : (
        <FollowCard name="누우누우" id="1" />
      )}
    </>
  );
};
export default AlarmSelectMenuBar;
