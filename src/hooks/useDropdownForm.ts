import { type DropDownActionType } from '@/types/common/profile';
import { type DropDownProfileDataType } from '@/types/user';
import { useReducer } from 'react';

export type DropDownDataType = Record<
  keyof DropDownProfileDataType,
  string | null
>;

const reducer = (state: DropDownDataType, action: DropDownActionType) => ({
  ...state,
  [action.name]: action.value,
});

const useDropdownForm = (initialState: DropDownDataType) => {
  const [dropDownState, setDropDownState] = useReducer(reducer, initialState);

  return [dropDownState, setDropDownState] as const;
};

export default useDropdownForm;
