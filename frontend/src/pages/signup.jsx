import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuthStore from "../store/authStore";

const Signup = () => {
  const navigate = useNavigate(); //5 가입 성공후 이동

  const { register, loading, error } = useAuthStore(); //4 함수작업후

  const [formData, setFormData] = React.useState({
    //1  모든 데이터를 객체 형태로(여러개니까) => handleChange 를 target.name 접근
    //적으면  const [email, setEmail = useState({}) ..이렇게 여러개 작성
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    //3
    e.preventDefault();
    // console.log(formData); // formData 객체에 담긴 값 확인

    try {
      //성공하면 가입후 토큰이 생성, 토큰을 모든페이지에서 공유 zustand(추가설정 불필요, 설치만)를 사용
      await register(formData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    //2  console.log(e.target.name, e.target.value); 확인하면 formData로 묶어서 여러번 출력되니 아래와 같이 작업
    //... 스프레드 문법, 기존의 formData 객체를 복사하고, [e.target.name] 키를 사용하여 해당 필드의 값을 e.target.value로 업데이트
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.email &&
    formData.fullName &&
    formData.username &&
    formData.password; //모든 필드가 채워져 있어야 true, 굳이 setState로 관리할 필요 없음

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="max-w-[420px] space-y-6 my-12">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-12 py-14">
          <h1 className="text-center mb-6 font-bold">
            <span className="text-6xl bg-gradient-to-r from-orange-600 via-yellow-300 to-purple-500 bg-clip-text text-transparent">
              데이터랑<p></p>놀자~
            </span>
          </h1>

          <p className="text-center text-gray-600 font-medium mb-10 text-base">
            데이터관리를 위한 회원가입을 해주세요!
          </p>

          <div className="space-y-4 mb-8">
            <Button variant="secondary" icon={<FcGoogle className="w-6 h-6" />}>
              Continue with Google
            </Button>

            <Button variant="secondary" icon={<FaGithub className="w-6 h-6" />}>
              Continue with GitHub
            </Button>
          </div>

          <div className="flex items-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="px-4 text-gray-500 text-sm font-bold">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="fullName"
              placeholder="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="username"
              placeholder="UserName"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" disabled={loading || !isFormValid}>
              {loading ? "가입 중..." : "회원가입"}
            </Button>
          </form>

          {error && (
            <p className="text-red-500 text-xs text-center mt-4">{error}</p>
          )}
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl px-12 py-8 text-center">
          <p className="text-gray-600">
            회원이신가요?{" "}
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold hover:from-purple-700 hover:to-pink-700 transition-all "
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
