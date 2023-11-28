import { useReducer } from 'react';

interface FormInitialStateType {
  gender: string;
  mbti: string;
  studentNumber: string;
  birthday: string;
  content: string;
}

interface actionType {
  name: string;
  value: string;
}

const reducer = (state: FormInitialStateType, action: actionType) => ({
  ...state,
  [action.name]: action.value,
});

const useDropdownForm = (initialState: FormInitialStateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
};

export default useDropdownForm;
