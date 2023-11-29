import styled from 'styled-components';
import tw from 'twin.macro';

interface DropDownStyleType {
  $isBorder: boolean;
}

export const DropDownStyle = styled.div<DropDownStyleType>`
  & {
    ${tw`flex relative w-24`}
    >button {
      border: ${props => (props.$isBorder ? '1px solid #C8C8C8' : 'none')};
      color: ${props => (props.$isBorder ? '#5C7899' : 'black')};
      ${tw`pl-2 flex justify-end rounded-2xl gap-2 items-center font-Pretendard-Regular w-full `}
    }
    > ul {
      ${tw`absolute top-7 z-10 w-20 bg-white border-2 rounded-lg max-h-40 overflow-y-auto`}
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
