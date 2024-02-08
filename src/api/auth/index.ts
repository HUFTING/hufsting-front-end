/* eslint-disable no-return-await */
import axiosInstance from '@/api/axiosInstance';
import { type LoginUserDataType } from '@/types/user';

export const loginAPI = async (code: string): Promise<LoginUserDataType> => {
  const { data } = await axiosInstance.get(
    `/apis/auth/google/callback?code=${code}`,
  );
  return data;
};
// http://www.hufsting.com:8080/auth/google/callback?code

export const logoutAPI = async () => await axiosInstance.get('/auth/logout');
