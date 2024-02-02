'use client';

import Text from '@/components/common/text/Text';
import HuftingAlarmIcon from '@/components/common/ui/HuftingAlarmIcon';
import relativeDate from '@/utils/relativeDate';

const HuftingAlarmCard = ({
  type,
  date,
  text,
  id,
}: {
  type: string;
  date: Date;
  text: string;
  id: string;
}) => (
  <div className="flex p-4 items-start cursor-pointer">
    {type === 'new' ? (
      <HuftingAlarmIcon classname="mt-1" type="new" />
    ) : (
      <HuftingAlarmIcon classname="mt-1" type="complete" />
    )}
    <div className="ml-4">
      {type === 'new' ? (
        <Text
          content="새로운 훕팅 신청이 있어요!"
          fontSize="md"
          fontWeight="SemiBold"
          color="black"
        />
      ) : (
        <Text
          content="훕팅 매칭이 완료되었어요!"
          fontSize="md"
          fontWeight="SemiBold"
          color="black"
        />
      )}
      {type === 'new' ? (
        <Text
          color="gray"
          fontSize="xs"
          fontWeight="Regular"
          content={`내가 올린 ${text}글에 훕팅 신청이 왔습니다.`}
        />
      ) : (
        <>
          <Text
            color="gray"
            fontSize="xs"
            fontWeight="Regular"
            content={`${text} 글에 신청한 훕팅이 수락됐습니다.`}
          />
          <Text
            color="gray"
            fontSize="xs"
            fontWeight="Regular"
            content="지금 오픈채팅방 링크를 확인해보세요!"
          />
        </>
      )}

      <Text
        color="gray"
        fontSize="xs"
        fontWeight="Regular"
        content={`${relativeDate(new Date())}`}
      />
    </div>
  </div>
);

export default HuftingAlarmCard;
