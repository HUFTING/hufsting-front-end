import styled from 'styled-components';
import tw from 'twin.macro';

interface props {
  disabled: boolean;
}

const InputStyle = styled.div<props>`
  & {
    ${tw`flex justify-start w-full gap-1 border border-[#8D8D8D] border-solid rounded-[80px] h-10 px-3 overflow-hidden`}
    input {
      ${tw`flex h-full flex-grow border-none`}
    }
    input:focus {
      outline: none;
    }
    input::placeholder {
      color: #8d8d8d;
      font-size: 0.875rem;
    }
    div {
    }
  }
`;
export default InputStyle;
