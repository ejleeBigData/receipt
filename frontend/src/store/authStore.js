import { create } from "zustand";
import { authService } from "../services/auth";

//리턴이 바로 객체일때는 소괄호로 감싸줘야함 const useAuthStore = create(() => ()); 에서 시작
const useAuthStore = create((set) => ({
  //값들
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),
  loading: false,
  error: null,

  login: async (userData) => {
    set({ loading: true, error: null });

    try {
      //로그인요청,응답 => set에 반영
      const data = await authService.login(userData);
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
      return data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "로그인 실패",
      });
      throw err;
    }
  },

  //값을 가져오는 함수들
  register: async (userData) => {
    set({ loading: true, error: null });
    //두단계 : 서버 요청,응답 => 서비스란 이름으로 따로 관리, axios
    //set에 반영
    try {
      //await authService.register(userData); 에서 테스트
      const data = await authService.register(userData);
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
      return data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "가입 실패", //javascript optional chaining, response있으면 data읽고, data 있으면 message 읽고 response가 없으면 가입실패 출력됨
      });
      throw err;
    }
  },

  logout: () => {
    authService.logout(); //영구적으로 저장되는 로컬스토리지 삭제
    set({
      //store 초기화
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  setAuth: (authData) => set(authData),

  updateUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },
}));

export default useAuthStore;
