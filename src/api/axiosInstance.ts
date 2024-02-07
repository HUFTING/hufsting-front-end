import axios, { type AxiosInstance } from 'axios';

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    response => response,
    async error => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // 로그인이 필요합니다.
        const loginError = new Error('로그인이 필요합니다.');
        // eslint-disable-next-line @typescript-eslint/return-await
        return Promise.reject(loginError);
      }
      // eslint-disable-next-line @typescript-eslint/return-await
      return instance;
    },
  );
  return instance;
};

const axiosInstance = axios.create({
  baseURL: 'http://www.hufsting.com:8080',
  withCredentials: true,
});

setInterceptors(axiosInstance);

export default axiosInstance;
