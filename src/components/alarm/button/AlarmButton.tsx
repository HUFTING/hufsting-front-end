import Text from '@/components/common/text/Text';

type AlarmButtonType = 'submit' | 'cancel';

const AlarmButton = ({
  type,
  onClick,
}: {
  type: AlarmButtonType;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${
      type === 'submit' ? ' bg-[#FF6969]' : 'bg-[#7A7A7A]'
    } text-white rounded-tr-xl rounded-bl-xl h-fit pt-1 text-center flex justify-center items-center w-12`}
  >
    {type === 'submit' ? (
      <Text fontSize="sm" content="확인" color="white" fontWeight="Regular" />
    ) : (
      <Text fontSize="sm" content="취소" color="white" fontWeight="Regular" />
    )}
  </button>
);

export default AlarmButton;
