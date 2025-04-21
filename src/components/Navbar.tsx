import { Link } from "react-router-dom";

const Navbar = () => {
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
                        <span className="mx-1.5 sm:mx-6">
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
