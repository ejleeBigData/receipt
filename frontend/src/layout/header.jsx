import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import useAuthStore from "../store/authStore";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4">
            <Link to="/" title="Home">
              🌳
            </Link>
            <Link to="/data" className="hover:underline">
              데이터랑
            </Link>
            <Link to="/category" className="hover:underline">
              카테고리랑
            </Link>{" "}
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:underline">
                <CgProfile
                  size={24}
                  className="text-lime-900 font-semibold"
                  cursor={"pointer"}
                  title="회원정보 수정"
                />
              </Link>
              <span className="text-lime-900 font-semibold">
                {user?.username}님
              </span>
              <RiLogoutCircleRLine
                size={24}
                onClick={handleLogout}
                className="text-lime-900 font-semibold"
                cursor={"pointer"}
                title="Logout"
              />
            </>
          ) : (
            <>
              <Link to="/signup" className="hover:underline">
                회원가입
              </Link>
              <Link to="/login" className="hover:underline">
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
