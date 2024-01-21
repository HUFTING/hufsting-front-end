import tw from 'twin.macro';
import { styled } from 'styled-components';

export const FollowerListPageStyle = styled.article`
  & {
    ${tw`flex flex-col h-screen`}

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
    ${tw`flex items-center gap-2 justify-between w-full rounded-md px-4 text-xl font-normal hover:bg-[#FF6869] cursor-pointer hover:text-white`}

    > div.photo {
      ${tw`flex rounded-[50%] w-10 h-10 border border-solid border-[#FF6869] bg-[#F3F3F3] relative overflow-hidden`}
    }

    > div.user {
      ${tw`flex flex-grow items-center justify-between border-b-[2px] border-solid border-[#D9D9D9] py-3 px-2`}

      > div:first-child {
        ${tw`flex flex-col `}

        > div:first-child {
          ${tw`text-lg`}
        }

        > div:nth-child(2) {
          ${tw`text-sm text-[#7A7A7A]`}
        }
      }
    }
  }
`;
