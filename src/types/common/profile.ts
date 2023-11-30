import { type Dispatch } from 'react';

export interface DropDownActionType {
  name: string;
  value: string;
}

export interface DropDownTypes {
  dropDownState: string;
  dropDownItems?: string[];
  dropDownTitle: string;
  dropDownName: string;
  isBorder?: boolean;
  required?: boolean;
  onChange?: Dispatch<DropDownActionType>;
  disabled?: boolean;
  handleCloseDropDown: () => void;
}
export interface DropDownDataType {
  dropDownTitle: string;
  dropDownName: string;
  dropDownItems?: string[];
  required?: boolean;
  disabled?: boolean;
}

export type UserProfileInputType = Omit<
  DropDownTypes,
  'isBorder' | 'handleCloseDropDown'
>;

export type DropDownProps = Pick<
  DropDownTypes,
  | 'dropDownState'
  | 'dropDownItems'
  | 'dropDownName'
  | 'onChange'
  | 'disabled'
  | 'isBorder'
>;

export type DropDownListType = Pick<
  DropDownTypes,
  'dropDownItems' | 'dropDownName' | 'onChange' | 'handleCloseDropDown'
>;

export type DropDownType = Pick<
  DropDownTypes,
  | 'dropDownState'
  | 'dropDownItems'
  | 'dropDownName'
  | 'isBorder'
  | 'onChange'
  | 'disabled'
>;
