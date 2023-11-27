import Text from '@/components/common/text/Text';
import {
  TextAreaContainer,
  TextAreaStyle,
} from '@/components/signup/UserProfileTextArea/style';
import React, { type KeyboardEvent } from 'react';

const UserProfileTextArea = ({
  titleContent,
  subTitleContent,
}: {
  titleContent: string;
  subTitleContent: string;
}) => {
  const handleTextAreaEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
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
        placeholder="최대 50자를 입력할 수 있습니다."
        maxLength={50}
        onKeyDown={handleTextAreaEnter}
      />
    </TextAreaContainer>
  );
};

export default UserProfileTextArea;
