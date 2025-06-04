import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/slices/userSlice";
import { UserState } from "../../config/UserStateConftg";

const Navbar = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
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
      <nav className="fixed w-full z-50 bg-dark-glass glass-card bg-white py-3 px-8 backdrop-blur-lg border-b border-1 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">
                 <Link to="/home" className="hover:text-neon transition-colors">
            <span className="text-black montserrat-bold">READORA</span> 
            </Link>
          </div>
          <div className="flex items-center space-x-6 nunito-regular justify-center mx-auto">
            <Link to="/home" className="hover:text-neon transition-colors">
              <span className='font-bold'>Home</span>
            </Link>
            <Link to="/articles" className="hover:text-neon transition-colors">
              <span className='font-bold'>Articles</span>

            </Link>
            <Link to="/about" className="hover:text-neon transition-colors">
              <span className='font-bold'>About</span>

            </Link>
            <Link to="/contact" className="hover:text-neon transition-colors">
              <span className='font-bold'>Contact</span>

            </Link>
          </div>
          {/* profile section */}
          <div>
            <div className="relative">
              {isUser ? (
                <div className="flex items-center space-x-4">
                  <p className="hidden sm:block">{user?.name}</p>
                  <img
                    onClick={() => setDropdown((prev) => !prev)}
                    className="w-10 h-10 p-1 cursor-pointer rounded-full ring-2 ring-gray-300"
                    src={user?.profilePicture}
                    alt="User Avatar"
                  />
                  {/* Dropdown */}
                  {dropdown && (
                    <div className="absolute right-0 mt-40 w-32 bg-gray-800 text-white rounded-md shadow-lg z-50">
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
                <Link
                  to="/login"
                  className="hover:text-indigo-400 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
