import tw from 'twin.macro';
import { styled } from 'styled-components';

export const MainHeaderStyle = styled.section`
  & {
    ${tw`w-full p-4 flex justify-between`}

    >div:first-child {
      ${tw`cursor-pointer`}
    }

    > div:nth-child(2) {
      ${tw`flex gap-4 items-center`}
      > div {
        ${tw`cursor-pointer`}
      }
    }
  }
`;

export const SubHeaderStyle = styled.section`
  & {
    ${tw`bg-pink-200 w-full h-10`}
  }
`;
