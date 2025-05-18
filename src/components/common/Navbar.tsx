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
            <nav className="shadow bg-[#151031] text-white">
      <div className="lg:max-w-screen lg:ml-[50rem] sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Navigation section */}
        <div className="flex space-x-6 text-sm sm:text-base">
          <Link to="/home" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link to="/articles" className="hover:text-indigo-400 transition">
            Articles
          </Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">
            Contact
          </Link>
          <Link to="/about" className="hover:text-indigo-400 transition">
            About
          </Link>
        </div>

        {/* Right Section (User or Login) */}
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
                <div className="absolute right-0 mt-12 w-32 bg-gray-800 text-white rounded-md shadow-lg z-50">
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
    </nav>
    );
};

export default Navbar;
