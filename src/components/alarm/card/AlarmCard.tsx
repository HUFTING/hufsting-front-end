'use client';

import Text from '@/components/common/text/Text';
import HuftingAlarmIcon from '@/components/common/ui/HuftingAlarmIcon';
import { type HuftingAlarmIconType } from '@/types/alarm';
import relativeDate from '@/utils/relativeDate';
import { useRouter } from 'next/navigation';

const HuftingAlarmCard = ({
  type,
  date,
  text,
  id,
}: {
  type: HuftingAlarmIconType;
  date: Date;
  text: string;
  id: number;
}) => {
  const router = useRouter();
  const handleOnClick = () => {
    switch (type) {
      case '매칭 요청':
        router.push(`/new-request?id=${id}&from=${'alarm'}`);
        break;
      case '매칭 수락':
        router.push(`/result?id=${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div
      role="presentation"
      className="flex p-4 items-start cursor-pointer"
      onClick={handleOnClick}
    >
      <HuftingAlarmIcon classname="mt-1" type={type} />

      <div className="ml-4 w-[270px]">
        {type === '매칭 요청' ? (
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
        {type === '매칭 요청' ? (
          <Text color="gray" fontSize="xs" fontWeight="Regular">
            {'내가 올린 '}
            <Text
              color="red"
              fontSize="xs"
              fontWeight="Regular"
              content={text}
              className="inline"
            />
            {' 글에 훕팅 신청이 왔습니다.'}
          </Text>
        ) : (
          <Text color="gray" fontSize="xs" fontWeight="Regular">
            <Text
              color="red"
              fontSize="xs"
              fontWeight="Regular"
              content={text}
              className="inline"
            />
            {
              '글에 신청한 훕팅이 수락됐습니다.\n지금 오픈채팅방 링크를 확인해보세요!'
            }
          </Text>
        )}

        <Text
          color="gray"
          fontSize="xs"
          fontWeight="Regular"
          content={relativeDate(date)}
        />
      </div>
    </div>
  );
};

export default HuftingAlarmCard;
