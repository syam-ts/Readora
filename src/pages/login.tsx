import axios from "axios";
import { toast } from "sonner";
import { config } from "../config/config";
import { useEffect, useState } from "react";
import { Sonner } from "../components/sonner/Sonner";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../config/UserStateConftg";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/slices/userSlice";
import { userLoginSchema } from "../utils/validation/loginSchema";

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
            console.log('er',err.response)
            toast.error(err.response.data.message, {
                position: "bottom-center",
                style: {
                    backgroundColor: "red",
                    color: "white",
                    width: "full",
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
         <div className="h-screen flex flex-col lg:flex-row">
      {/* Notification System */}
      <Sonner />

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl sm:text-4xl text-indigo-900 font-semibold mb-10">
            Log in
          </h2>

          {/* Email Field */}
          <div className="mb-6">
            <label className="text-sm font-bold text-gray-700">
              Email Address
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="email"
              className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="email"
              placeholder="vinaykumar@gmail.com"
            />
            {error?.map((err: string, index: number) => {
              if (
                err.includes("Email is required") ||
                err.includes("Email is invalid")
              ) {
                return (
                  <div key={index} className="text-center">
                    <span className="text-red-500 text-xs font-semibold">
                      {err}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="password"
              className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Enter your password"
            />
            {error?.map((err: string, index: number) => {
              if (
                err.includes("Password is required") ||
                err.includes("minimum 8 characters need")
              ) {
                return (
                  <div key={index} className="text-center">
                    <span className="text-red-500 text-xs font-semibold">
                      {err}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Login Button */}
          <div className="mt-8">
            <button
              onClick={submitForm}
              className="bg-gray-600 text-white p-3 w-full rounded-full font-semibold hover:bg-indigo-600 transition shadow-lg"
            >
              Log In
            </button>
          </div>

          {/* Redirect to Signup */}
          <div className="mt-8 text-sm text-center text-gray-700 font-semibold">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800 underline ml-1"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className=" lg:block lg:w-1/2">
        <img
          src="https://img.freepik.com/free-photo/concept-fake-news_23-2148837021.jpg?ga=GA1.1.971265415.1746433248&semt=ais_hybrid&w=740"
          alt="Login Visual"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
    );
};

export default LoginPage;
