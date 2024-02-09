import axios, { type AxiosInstance } from 'axios';

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    response => response,
    async error => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // 로그인이 필요합니다.
        // eslint-disable-next-line @typescript-eslint/return-await
        return Promise.reject(error);
      }
      // console.log(error);
      // eslint-disable-next-line @typescript-eslint/return-await
      return Promise.reject(error);
    },
  );
  return instance;
};

const axiosInstance = axios.create({
  baseURL: '',
  withCredentials: true,
});

setInterceptors(axiosInstance);

export default axiosInstance;
