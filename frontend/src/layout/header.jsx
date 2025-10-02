import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-xl">🌳</span>

          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:underline">
              홈
            </Link>
            <Link to="/soil" className="hover:underline">
              데이터랑
            </Link>
            <Link to="/stem" className="hover:underline">
              카테고리랑
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <>
            <Link to="/signup" className="hover:underline">
              회원가입
            </Link>
            <Link to="/login" className="hover:underline">
              로그인
            </Link>
          </>
        </div>
      </div>
    </header>
  );
};

export default Header;
