import axios from "axios";
import { config } from "../config/config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../config/UserStateConftg";
import { signInUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { userLoginSchema } from "../utils/validation/loginSchema";
import { toast } from "sonner";
import { Sonner } from "../components/sonner/Sonner";

interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isUser = useSelector((state: UserState) => state.isUser);
    console.log('The backend url: ', import.meta.env.VITE_BACKEND_ORIGIN)

    useEffect(() => {
        if (isUser) navigate("/home");
    }, []);

    const submitForm = async () => {
        try {
            const validForm = await userLoginSchema.validate(formData, {
                abortEarly: false,
            });
            console.log("er", validForm);

            if (validForm) {
                const { data } = await axios.post(
                    `${config.SERVER_URL}/login`,
                    {
                        email: formData.email,
                        password: formData.password,
                    },
                    {
                        withCredentials: true,
                    }
                );

                dispatch(signInUser(data.user));
                const { accessToken } = data;

                localStorage.setItem("accessToken", accessToken);

                if (data.success) {
                    navigate("/home");
                }
            } else {
                await userLoginSchema.validate(
                    { formData },
                    {
                        abortEarly: false,
                    }
                );
            }
        } catch (error: unknown) {
            const err = error as {
                errors: string[];
                response: {
                    data: {
                        message: string;
                    };
                };
            };
            toast.error(err.response.data.message, {
                position: "bottom-center",
                style: {
                    backgroundColor: "red",
                    color: "white",
                    width: "12rem",
                    height: "3rem",
                    justifyContent: "center",
                    border: "none",
                },
            });
            console.log("VALIDATION ERRORS: ", err.errors);
            setError(err.errors);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="w-screen h-screen flex">
            <Sonner />
            <div className="w-2/4 h-screen pt-55  px-28">
                <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                    <h2
                        className="text-4xl text-indigo-900 font-display font-semibold text-start
                    xl:text-bold"
                    >
                        Log in
                    </h2>
                    <div className="mt-12">
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">
                                Email Address
                            </div>
                            <input
                                onChange={(e) => handleChange(e)}
                                name="email"
                                className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type=""
                                placeholder="vinaykumar@gmail.com"
                            />
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
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Password
                                </div>
                            </div>
                            <input
                                onChange={(e) => handleChange(e)}
                                name="password"
                                className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type=""
                                placeholder="Enter your password"
                            />

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
                        </div>
                        <div className="mt-10">
                            <button
                                onClick={submitForm}
                                className="bg-gray-600 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                            >
                                Log In
                            </button>
                        </div>

                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Don't have an account ?{" "}
                            <p className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                                <Link to="/signup">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* image section */}

            <div className="w-2/4 h-screen">
                <div className="max-w-full">
                    <img
                        src="https://img.freepik.com/free-photo/concept-fake-news_23-2148837021.jpg?ga=GA1.1.971265415.1746433248&semt=ais_hybrid&w=740"
                        className="h-screen w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
