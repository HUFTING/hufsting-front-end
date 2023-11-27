import tw from 'twin.macro';
import { styled } from 'styled-components';

export const TextAreaContainer = styled.section`
  & {
    ${tw`w-full flex flex-col mb-4`}
  }
`;

export const TextAreaStyle = styled.textarea`
  & {
    ${tw`max-w-full max-h-20 text-ellipsis flex-nowrap p-2 overflow-hidden  bg-[#D9D9D9] resize-none rounded-lg `}
  }
`;
