import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../redux/slices/userSlice";


interface FormData {
    email: string
    password: string
};

const SignupPage = () => {

const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
});
const navigate = useNavigate();
const dispatch = useDispatch();

const submitForm = async () => {
    const { data } = await axios.post('http://localhost:3000/user/signup', {
        email: formData.email,
        password: formData.password
    });
    
    dispatch(signInUser(data.user));

    console.log('The result: ', data)
    if(data.success) {
        navigate('/login')
    }
}
 

const handleChange = (e: any) => {
  const {name, value} = e.target;
 setFormData(prev => ({
    ...prev,
    [name]:  value
 }))
}



    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-44 h-[36rem]">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex border border-gray-300 rounded-lg">
                    <div className="w-full h-auto bg-gray-400 lg:block bg-[url('https://images.unsplash.com/photo-1533756102515-155e3863ee1c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixname=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] lg:w-1/2 bg-cover rounded-l-lg"></div>
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-12 text-2xl text-center">Welcome Back!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    Name
                                </label>
                                <input
                                onChange={(e) => handleChange(e)}
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="name"
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    Email
                                </label>
                                <input
                                onChange={(e) => handleChange(e)}
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    Password
                                </label>
                                <input 
                                onChange={(e) => handleChange(e)}
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                />
                            </div>

                            <div className="mb-6 text-center">
                                <button
                                onClick={submitForm}
                                    className="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="flex justify-between">
                                <div className="text-center">
                                    <a
                                        className="inline-block underline text-sm text-gray-500 align-baseline hover:text-blue-800"
                                        href="#"
                                    >
                                       <Link to='/login'>
                                          Alreay have an Account!
                                       </Link>
                                    </a>
                                </div>
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-gray-500 align-baseline hover:text-blue-800"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
