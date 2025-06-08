import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/slices/userSlice";
import { UserState } from "../../config/UserStateConftg";

const Navbar = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state: UserState) => state.currentUser);
  const isUser = useSelector((state: UserState) => state.isUser);
  const distpatch = useDispatch();
  const navigate = useNavigate();

  const signoutUser = (): void => {
    distpatch(signOutUser());
    navigate("/login");
  };

  return (
    <div>
      <nav className="fixed w-full z-50 bg-white py-3 px-6 md:px-8 shadow-lg border-b backdrop-blur-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">
            <Link to="/home" className="hover:text-neon transition-colors">
              <span className="text-black montserrat-bold text-3xl">
                READORA
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            <Link
              to="/home"
              className="hover:text-neon text-black text-[1.2rem] nunito-regular"
            >
              Home
            </Link>
            <Link
              to="/articles"
              className="hover:text-neon text-black text-[1.2rem] nunito-regular"
            >
              Articles
            </Link>
            <Link
              to="/about"
              className="hover:text-neon text-black text-[1.2rem] nunito-regular"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-neon text-black text-[1.2rem] nunito-regular"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-2xl"
            >
              {mobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
            </button>
          </div>

          {/* Profile Section */}
          <div className="hidden md:block relative">
            {isUser ? (
              <div className="flex items-center space-x-4">
                <p className="hidden sm:block nunito-regular">{user?.name}</p>
                <img
                  onClick={() => setDropdown((prev) => !prev)}
                  className="w-10 h-10 p-1 cursor-pointer rounded-full ring-2 ring-gray-300"
                  src={user?.profilePicture}
                  alt="User Avatar"
                />
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-black text-white rounded-md shadow-lg z-50">
                    <ul className="py-2 text-sm">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-700"
                          onClick={() => setDropdown(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            signoutUser();
                            setDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-700"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-indigo-400 transition">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 px-6 space-y-4 bg-white shadow-md py-4">
            <Link to="/home" className="block text-black hover:text-neon">
              Home
            </Link>
            <Link to="/articles" className="block text-black hover:text-neon">
              Articles
            </Link>
            <Link to="/about" className="block text-black hover:text-neon">
              About
            </Link>
            <Link to="/contact" className="block text-black hover:text-neon">
              Contact
            </Link>

            {isUser ? (
              <div className="pt-2 border-t border-gray-300">
                <p className="mb-2">{user?.name}</p>
                <Link
                  to="/profile"
                  className="block text-black hover:text-neon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-left w-full text-black hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block text-black hover:text-indigo-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
