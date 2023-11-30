import Text from '@/components/common/text/Text';
import {
  TextAreaContainer,
  TextAreaStyle,
} from '@/components/common/input/UserProfileTextArea/style';
import React, { type KeyboardEvent } from 'react';

const UserProfileTextArea = ({
  titleContent,
  subTitleContent,
  disabled = false,
  state,
  setState,
}: {
  titleContent: string;
  subTitleContent: string;
  disabled?: boolean;
  state?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleTextAreaEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(e.target.value);
  };
  return (
    <TextAreaContainer>
      <Text
        color="black"
        fontSize="xl"
        fontWeight="ExtraBold"
        content={titleContent}
      />
      <Text
        color="gray"
        fontSize="sm"
        fontWeight="SemiBold"
        content={subTitleContent}
        className="mb-3"
      />
      <TextAreaStyle
        disabled={disabled}
        placeholder="최대 50자를 입력할 수 있습니다."
        maxLength={50}
        value={state}
        onKeyDown={handleTextAreaEnter}
        onChange={handleChange}
      />
    </TextAreaContainer>
  );
};

export default UserProfileTextArea;
