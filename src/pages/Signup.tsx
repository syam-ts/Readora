import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { userSignupSchema } from "../utils/validation/signupSchema";
import { config } from "../config/config";
import { UserState } from "../config/UserStateConftg";


interface FormData {
    name: string
    email: string
    password: string
};

const SignupPage = () => {

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState<string[]>([]);
    const navigate = useNavigate(); 
    const isUser = useSelector((state: UserState) => state.isUser);

    useEffect(() => {
        if(isUser)
            navigate('/home')
    }, []);

    const submitForm = async () => {
        try {
            const validForm = await userSignupSchema.validate(formData, {
                abortEarly: false,
            });

            if (validForm) {
                const { data } = await axios.post(`${config.SERVER_URL}/signup`, {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
 
                const userId = data.user.userId;
                console.log('the result', data) 
                if (data.success) {
                    navigate(`/preferences?userId=${userId}`);
                }
            } else {
                await userSignupSchema.validate(formData, {
                    abortEarly: false,
                });
            }

        } catch (error: unknown) {
            const err = error as { errors: string[] };
            console.log('VALIDATION ERROR: ',err.errors)
            setError(err.errors);
        }
    }


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }



    return (
        <div className="container mx-auto nunito-regular">
            <div className="flex justify-center px-6 my-44 h-[40rem]">
                <div className="w-full xl:w-4/5 lg:w-11/12 flex border border-gray-300 ">
                    <div className="w-full h-auto bg-gray-400 lg:block bg-[url('https://images.unsplash.com/photo-1533756102515-155e3863ee1c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixname=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] lg:w-1/2 bg-cover"></div>
                    <div className="w-full lg:w-2/4 bg-white p-5 ">
                        <h3 className="pt-12 text-2xl text-center">Welcome Back!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    Name
                                </label>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="name"
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>

                            {error?.some((err: string) => err.includes("Email is required"))
                                ? error?.map((err: string, index: number) => {
                                    if (err.includes("Name is required")) {
                                        return (
                                            <div key={index} className="text-center">
                                                <span className="text-black text-xs montserrat-bold">
                                                    {err}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })
                                : error?.map((err: string, index: number) => {
                                    if (
                                        err.includes("Name is required") ||
                                        err.includes("Invalid name (minimum 5 characters)") ||
                                        err.includes("Invalid name (maximum 20 characters)")
                                    ) {
                                        return (
                                            <div key={index} className="text-center">
                                                <span className="text-black text-xs montserrat-bold">
                                                    {err}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">
                                    Email
                                </label>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>


                            {error?.some((err: string) => err.includes("Email is required"))
                                ? error?.map((err: string, index: number) => {
                                    if (err.includes("Email is required")) {
                                        return (
                                            <div key={index} className="text-center">
                                                <span className="text-black text-xs montserrat-bold">
                                                    {err}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })
                                : error?.map((err: string, index: number) => {
                                    if (
                                        err.includes("Email is required") ||
                                        err.includes("Email is invalid")
                                    ) {
                                        return (
                                            <div key={index} className="text-center">
                                                <span className="text-black text-xs montserrat-bold">
                                                    {err}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                            <div className="py-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    Password
                                </label>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                />
                            </div>

                            {error?.some((err: string) =>
                                err.includes("Password is required")
                            )
                                ? error?.map((err: string, index: number) => {
                                    if (err.includes("Password is required")) {
                                        return (
                                            <div key={index} className="text-center">
                                                <span className="text-black text-xs montserrat-bold">
                                                    {err}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })
                                : error?.map((err: string, index: number) => {
                                    if (
                                        err.includes("Password is required") ||
                                        err.includes("minimum 8 characters need")
                                    ) {
                                        return (
                                            <div key={index} className="text-center">
                                                <span className="text-black text-xs montserrat-bold">
                                                    {err}
                                                </span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                     
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
                                    <p
                                        className="inline-block underline text-sm text-gray-500 align-baseline hover:text-blue-800"
                                    >
                                        <Link to='/login'>
                                            Alreay have an Account!
                                        </Link>
                                    </p>
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
