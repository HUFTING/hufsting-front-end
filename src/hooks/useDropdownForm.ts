import { type DropDownActionType } from '@/types/common/profile';
import { type ProfileDataType } from '@/types/user';
import { useReducer } from 'react';

export type DropDownDataType = Record<keyof ProfileDataType, string | null>;

const reducer = (state: DropDownDataType, action: DropDownActionType) => ({
  ...state,
  [action.name]: action.value,
});

const useDropdownForm = (initialState: DropDownDataType) => {
  const [dropDownState, setDropDownState] = useReducer(reducer, initialState);

  return [dropDownState, setDropDownState] as const;
};

export default useDropdownForm;
