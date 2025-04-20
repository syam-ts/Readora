const Navbar = () => {

    
    return (
        <div>
            <nav className="shadow bg-[#151031]">
                <div className="flex justify-between p-5 text-white">
                    <div className="pl-[45rem]">
                        <span className="text-white mx-1.5 sm:mx-6">Home</span>
                        <span className="mx-1.5 sm:mx-6">Articles</span>
                        <span className="mx-1.5 sm:mx-6">Contact</span>
                        <span className="mx-1.5 sm:mx-6">About</span>
                    </div>

                    <div>
                        <span className="mx-1.5 sm:mx-6">Login</span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
