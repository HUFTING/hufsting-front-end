import axiosInstance from '@/api/axiosInstance';
import { type MateInfo } from '@/types/user';

export const getMateListAPI = async (memberId: number): Promise<MateInfo[]> => {
  const { data } = await axiosInstance.get(`/api/v1/followingList/${memberId}`);
  return data;
};

export const searchMateListAPI = async (email: string): Promise<MateInfo> => {
  const { data } = await axiosInstance.get(
    `/api/v1/searching/?member_email=${email}`,
  );
  return data;
};

export const followMateAPI = async (): Promise<boolean> => {
  const { data } = await axiosInstance.get(`/api/v1/follow`);
  return data;
};
