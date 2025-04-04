import { getAccessToken, removeAccessToken } from '@/utils/token';
import axios from 'axios';

const baseUrl =
  import.meta.env.VITE_ENV === 'local' ? '' : import.meta.env.VITE_API_BASEURL;

const API = axios.create({
  baseURL: baseUrl + '/api/forwarder',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정: 모든 요청에 Authorization 헤더 추가
API.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정: 401 에러 시 로그인 페이지로 이동
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰 삭제
      removeAccessToken();
      // 로그인 페이지로 리다이렉트
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default API;
