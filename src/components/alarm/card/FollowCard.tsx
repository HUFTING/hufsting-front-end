import AlarmButton from '@/components/alarm/button/AlarmButton';
import Text from '@/components/common/text/Text';
import ProfileIcon from '@/components/common/ui/ProfileIcon';
import relativeDate from '@/utils/relativeDate';

const FollowCard = ({
  name = '누우누우',
  id,
}: {
  name: string;
  id: string;
}) => (
  <div className="flex px-4 py-4 justify-between">
    <ProfileIcon className="w-10 h-10 mt-2" />
    <div className="ml-4">
      <Text content={name} fontSize="lg" fontWeight="SemiBold" color="black" />
      <Text
        content="님의 팔로우 요청!"
        fontSize="sm"
        fontWeight="Regular"
        color="gray"
      />
      <Text
        content="훕팅 메이트가 되어 같이 훕팅해보세요!"
        fontSize="xs"
        fontWeight="Regular"
        color="gray"
      />
      <Text
        color="gray"
        fontSize="xs"
        fontWeight="Regular"
        content={`${relativeDate(new Date())}`}
      />
    </div>
    <div className="flex justify-between mt-2 w-28">
      <AlarmButton type="submit" onClick={() => {}} />
      <AlarmButton type="cancel" onClick={() => {}} />
    </div>
  </div>
);
export default FollowCard;
