import tw from 'twin.macro';
import { styled } from 'styled-components';

export const FollowerListPageStyle = styled.article`
  & {
    ${tw`flex flex-col`}

    section.add-follower {
      ${tw`flex w-full items-center gap-2 justify-end px-2 text-[1.125rem] cursor-pointer`}
    }

    section.list {
      ${tw`flex w-full gap-2 flex-col py-4`}
    }
  }
`;

export const FollowerListItemStyle = styled.div`
  & {
    ${tw`h-[3rem] flex items-center w-full bg-[#F9F9FB] border-b border-solid border-[#D9D9D9] py-2 px-6 text-xl font-normal hover:bg-[#FF6869] cursor-pointer hover:text-white`}
  }
`;
