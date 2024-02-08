/* eslint-disable no-return-await */
import axiosInstance from '@/api/axiosInstance';

export const loginAPI = async (code: string) => {
  const { data } = await axiosInstance.get(
    `/auth/google/callback?code=${code}`,
  );
  return data;
};
// http://www.hufsting.com:8080/auth/google/callback?code

export const logoutAPI = async () => await axiosInstance.get('/auth/logout');
