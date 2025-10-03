import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Input from "../components/ui/Input";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const { login, loading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = isEmail(formData.emailOrUsername)
        ? { email: formData.emailOrUsername, password: formData.password }
        : { username: formData.emailOrUsername, password: formData.password };
      await login(loginData);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/oauth2/authorization/${provider}`;
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="max-w-[420px] space-y-6 my-12">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-12 py-14">
          <h1 className="text-center mb-6 font-bold">
            <span className="text-5xl text-amber-600">데이터랑 놀자!</span>
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="test"
              name="emailOrUsername"
              placeholder="Email address or Username"
              value={formData.email}
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

            <Button
              className="mt-4"
              type="submit"
              disabled={
                loading || !formData.emailOrUsername || !formData.password
              }
            >
              {loading ? "Loggin in ..." : "Login in"}
            </Button>
          </form>

          {error && (
            <p className="text-red-500 text-xs text-center mt-4">{error}</p>
          )}

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              variant="secondary"
              icon={<FcGoogle className="w-6 h-6" />}
              onClick={() => handleSocialLogin("google")}
            >
              Continue with Google
            </Button>

            <Button
              variant="secondary"
              icon={<FaGithub className="w-6 h-6" />}
              onClick={() => handleSocialLogin("github")}
            >
              Continue with GitHub
            </Button>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl px-12 py-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent font-semibold hover:from-purple-700 hover:to-pink-700 transition-all "
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
