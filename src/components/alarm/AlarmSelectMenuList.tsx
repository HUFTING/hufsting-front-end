'use client';

import { getAlarmListAPI } from '@/api/alarm';
import HuftingAlarmCard from '@/components/alarm/card/AlarmCard';
import FollowCard from '@/components/alarm/card/FollowCard';
import Text from '@/components/common/text/Text';
import SelectMenuBar from '@/components/mate/SelectMenuBar';
import { type AlarmListType } from '@/types/alarm';
import { useEffect, useState } from 'react';

type ALARM_TYPE = 'hufting' | 'follow';

const AlarmSelectMenuBar = () => {
  const [pageType, setPageType] = useState<ALARM_TYPE>('hufting');
  const [alarmList, setAlarmList] = useState<AlarmListType>({
    count: -1,
    data: [],
  });
  useEffect(() => {
    const getAlarmList = async () => {
      const data = await getAlarmListAPI();
      setAlarmList(data);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAlarmList();
  }, []);
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
        ]}
        pickedMenuId="hufting"
      />
      {pageType === 'hufting' ? (
        <>
          {alarmList.data.map(alarm => (
            <HuftingAlarmCard
              key={alarm.id}
              id={alarm.id}
              type={alarm.alarmType}
              date={alarm.createdAt}
              text={alarm.title}
            />
          ))}
          {alarmList.count === -1 && (
            <Text
              color="black"
              fontSize="xl"
              fontWeight="SemiBold"
              className="w-full  text-center"
            >
              잠시만 기다려주세요.
            </Text>
          )}
          {alarmList.count === 0 && <div>알람이 없습니다.</div>}
        </>
      ) : (
        <FollowCard name="누우누우" id="1" />
      )}
    </>
  );
};
export default AlarmSelectMenuBar;
