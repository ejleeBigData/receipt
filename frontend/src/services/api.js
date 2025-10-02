import axios from "axios";
import StorageService from "./storage";

//.env 파일에 넣어둔 환경변수 먼저(사용자한테 노출됨,network 탭에서 보임) 읽고 없으면 뒤 URL 사용
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//메인 요청이 가기 전에 토큰을 싣는 작업 :  Post, Like, Comment, Follow 공통
api.interceptors.request.use(
  (config) => {
    const token = StorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status == 401) {
      StorageService.clearAuth(); //토큰 삭제
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
