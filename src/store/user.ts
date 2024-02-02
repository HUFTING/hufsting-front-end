import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserDataType {
  email: string | null;
  name: string | null;
  major: string | null;
}

interface IUseUserDataStore {
  userData: UserDataType;
  setUserData: (userData: UserDataType) => void;
}

const useUserIdStore = create(
  persist<IUseUserDataStore>(
    set => ({
      userData: {
        email: null,
        name: null,
        major: null,
      },
      setUserData: userData => {
        set({ userData });
      },
    }),
    {
      name: 'userDataStorage',
    },
  ),
);

export default useUserIdStore;
