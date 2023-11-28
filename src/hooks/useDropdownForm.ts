import { type DropDownActionType } from '@/types/common/profile';
import { useReducer } from 'react';

type DropDownDataType = Record<string, string>;

const reducer = (state: DropDownDataType, action: DropDownActionType) => ({
  ...state,
  [action.name]: action.value,
});

const useDropdownForm = (initialState: DropDownDataType) => {
  const [dropDownState, setDropDownState] = useReducer(reducer, initialState);

  return [dropDownState, setDropDownState] as const;
};

export default useDropdownForm;
