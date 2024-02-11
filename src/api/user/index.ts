/* eslint-disable no-return-await */
import axiosInstance from '@/api/axiosInstance';
import {
  type TotalProfileDataType,
  type EnteredProfileDataType,
  type LoginUserDataType,
} from '@/types/user';

export const loginAPI = async (code: string): Promise<LoginUserDataType> => {
  const { data } = await axiosInstance.get(
    `/apis/auth/google/callback?code=${code}`,
  );
  return data;
};
// http://www.hufsting.com:8080/auth/google/callback?code

export const saveProfileAPI = async (profileData: EnteredProfileDataType) =>
  await axiosInstance.post('/apis/api/v1/profile', profileData);

export const getProfileAPI = async (): Promise<TotalProfileDataType> => {
  const { data } = await axiosInstance.get('/apis/api/v1/profile');
  return data;
};

export const updateProfileAPI = async (profileData: EnteredProfileDataType) =>
  await axiosInstance.put('/apis/api/v1/profile', profileData);

export const deleteProfileAPI = async () =>
  await axiosInstance.delete('/apis/api/v1/member');
