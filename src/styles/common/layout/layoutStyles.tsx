import tw from 'twin.macro';
import { styled } from 'styled-components';

export const MainHeaderStyle = styled.section`
  & {
    ${tw`w-full p-4 flex justify-between relative z-[100]`}

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
    ${tw`flex justify-between items-center px-4 py-2`}

    > div:first-child,div:last-child {
      ${tw`cursor-pointer`}
    }

    > div:nth-child(2) {
      ${tw`text-2xl font-bold`}
    }
  }
`;

export const HamburgerMenuStyle = styled.section`
  & {
    ${tw`w-full h-10 absolute top-0 left-0 h-screen flex`}
    height: 100dvh;

    > div {
      ${tw`h-full`}
    }

    > div:first-child {
      ${tw`flex-grow h-full bg-[#E8E8E8] opacity-[60%]`}
    }

    > div.body {
      ${tw`w-[14rem] h-full bg-[#F8F8F8] py-7 flex flex-col justify-between`}

      > div:first-child {
        ${tw`w-full flex flex-col`}

        div.user-info {
          ${tw`w-full flex bg-[#EBEBEB] p-2 flex gap-2`}

          > div:first-child {
            ${tw`rounded-[50%] min-w-[3rem] w-12 min-h-[3rem] h-12 overflow-hidden relative`}
          }
          > div:last-child {
            ${tw`flex-grow min-w-[1px]`}
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;

            > div:first-child {
              color: #294566;
              font-size: 18px;
              font-weight: 800;
            }
            > div:last-child {
              color: #a3b6cc;
              font-size: 12px;
              font-weight: 600;
            }
          }
        }

        ul {
          ${tw`py-4 px-2 flex flex-col gap-2`}

          li {
            ${tw`flex justify-start gap-2 items-center py-2 pl-4 pr-2 cursor-pointer`}

            > div:last-child {
              ${tw`flex justify-center items-center flex-grow text-[#5C7899]`}
              font-size: 13px;
              font-weight: 500;
            }
          }
          li.picked {
            ${tw`bg-[#FF6969] rounded-3xl`}
            > div:last-child {
              ${tw`text-white`}
            }
          }
        }
      }

      > div:last-child {
        ${tw`flex w-full px-4 justify-center`}
      }
    }
  }
`;

export const BasicModalStyle = styled.article`
  & {
    ${tw`w-[390px] h-screen fixed flex justify-center items-center`}

    > section.modal {
      ${tw`w-[20.5rem] p-4 flex flex-col items-center gap-4 justify-center rounded-3xl bg-white`}
      box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    }
  }
`;
