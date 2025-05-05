import axios from "axios";
import { config } from "../config/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../config/UserStateConftg"; 
import { userSignupSchema } from "../utils/validation/signupSchema";
import { ErrorComponent } from "../components/errorComponents/ErrorComponent";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignupPage = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string[]>([]);
    const navigate = useNavigate();
    const isUser = useSelector((state: UserState) => state.isUser);

    useEffect(() => {
        if (isUser) navigate("/home");
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
                    password: formData.password,
                });

                const userId = data.user.userId;
                console.log("the result", data);
                if (data.success) {
                    navigate(`/preferences?userId=${userId}`);
                }
            } else {
                await userSignupSchema.validate(formData, {
                    abortEarly: false,
                });
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
            console.log("VALIDATION ERROR: ", err.errors);
            setError(err.errors);
        }
    };

    const handleChange = (e: any): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="w-screen h-screen flex">
            <div className="w-2/4 h-screen pt-44 px-28">
                <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                    <h2
                        className="text-4xl text-indigo-900 font-display font-semibold text-start
                            xl:text-bold"
                    >
                        Sign up
                    </h2>
                    <div className="mt-12">
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">
                                Name
                            </div>
                            <input
                                onChange={(e) => handleChange(e)}
                                name="name"
                                className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type=""
                                placeholder="vinaykumar"
                            />

                            <ErrorComponent
                                error={error}
                                e1="Name is required"
                                e2="Invalid name (minimum 5 characters)"
                                e3="Invalid name (maximum 20 characters)"
                            />
                        </div>

                        <div className="mt-8">
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
                            <ErrorComponent
                                error={error}
                                e1="Email is required"
                                e2="Email is invalid"
                                e3="Invalid Mail"
                            />
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

                            <ErrorComponent
                                error={error}
                                e1="Password is required"
                                e2="Include at least one number, uppercase letter"
                                e3="Incorrect (minimum 8 characters)"
                            />
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
                            already have an account ?
                            <p className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                                <Link to="/login">Login</Link>
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

export default SignupPage;
