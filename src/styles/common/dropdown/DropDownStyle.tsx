import styled from 'styled-components';
import tw from 'twin.macro';

interface DropDownStyleType {
  $isBorder: boolean;
}

export const DropDownStyle = styled.div<DropDownStyleType>`
  & {
    ${tw`flex relative w-fit`}
    >button {
      border: ${props => (props.$isBorder ? '1px solid #C8C8C8' : 'none')};
      color: ${props => (props.$isBorder ? '#5C7899' : 'black')};
      ${tw`pl-2 flex rounded-2xl gap-2 items-center font-Pretendard-Regular w-full `}
      > svg {
        ${tw`mr-2`}
      }
    }
    > ul {
      ${tw`absolute top-7 z-10 w-full bg-white border-2 rounded-lg`}
      > li {
        ${tw`px-2 py-2 border-b-2  cursor-pointer hover:bg-[#FF6969] hover:text-white`}
      }
      > li:first-child {
        ${tw` rounded-t-lg`}
      }
      > li:last-child {
        ${tw`border-none rounded-b-lg`}
      }
    }
  }
`;
export default DropDownStyle;
