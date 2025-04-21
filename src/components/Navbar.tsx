import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../redux/slices/userSlice";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false)
    const distpatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.currentUser);
    const isUser = useSelector((state: any) => state.isUser)
 
    // useEffect(() => {
    //     setDropdown(false);
    // }, []);

    const signoutUser = (): void => {
        distpatch(signOutUser());

        navigate('/login');

    };

    return (
        <div>
            <nav className="shadow bg-[#151031]">
                <div className="flex justify-between p-5 text-white">
                    <div className="pl-[45rem]">
                        <span className="text-white mx-1.5 sm:mx-6">
                            <Link to="/home"> Home </Link>
                        </span>
                        <span className="mx-1.5 sm:mx-6">
                            <Link to="/articles">Articles</Link>
                        </span>
                        <span className="mx-1.5 sm:mx-6">
                            <Link to="/home">Contact</Link>
                        </span>
                        <span className="mx-1.5 sm:mx-6">
                            <Link to="/home">About</Link>
                        </span>
                    </div>
                    <div>
                        {
                            isUser ? (
                                <div className='grid'>
                                    <div className='flex gap-5 px-7'>
                                        <p className='text-white'>{user?.name}</p>
                                        <img onClick={() => setDropdown((prev => !prev))} className="w-10 h-10 p-1 cursor-pointer rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={user.profilePicture} alt="Bordered avatar" />
                                    </div>
                                    <div>
                                        {
                                            dropdown && (
                                                <div className='w-[8rem] bg-gray-500 grid justify-center rounded-lg absolute right-0 mt-[1.2rem]'>
                                                    <ul className='grid gap-2 font-sans m-2 cursor-pointer'>
                                                        <li>
                                                            <Link to='/profile'>
                                                                Profile
                                                            </Link>
                                                        </li>
                                                        <li onClick={signoutUser}>Logout</li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <span className="mx-1.5 sm:mx-6">
                                        <Link to="/login">Login</Link>
                                    </span>
                                </div>
                            )

                        }
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;
