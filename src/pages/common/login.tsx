import { toast } from "sonner"; 
import { useEffect, useState } from "react";
import { userLogin } from "../../services/api/user";
import { Link, useNavigate } from "react-router-dom";
import { Sonner } from "../../components/sonner/Sonner";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../config/UserStateConftg";
import { signInUser } from "../../redux/slices/userSlice";
import { userLoginSchema } from "../../utils/validation/loginSchema";
import { ErrorComponent } from "../../components/errorComponents/ErrorComponent";

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
  const [loading, setLoading] = useState<boolean>(false);
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

      //checking validation
      // console.log("er", validForm);

      if (validForm) {
        setLoading(true);
        const { email, password } = formData;
        const response = await userLogin(email, password);

        if (!response.success) {
          toast.error(response.message, {
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
        }

        dispatch(signInUser(response.data.user));
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        if (response.data.success) {
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
    } catch (error: any) {
      console.log("VALIDATION ERRORS: ", error.errors);
      setError(error.errors);
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

            <ErrorComponent
              error={error}
              e1="Email is required"
              e2="Email is invalid"
              e3="Email is required"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <input
              onChange={(e) => handleChange(e)}
              name="password"
              className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Enter your password"
            />

            <ErrorComponent
              error={error}
              e1="Password is required"
              e2="minimum 8 characters need"
              e3="Password is required"
            />
          </div>

          {/* Login Button */}
          <div className="mt-8">
            <button
              onClick={submitForm}
              className="readora-theme text-white p-3 w-full rounded-full font-semibold hover:bg-indigo-600 transition shadow-lg"
            >
              {loading ? <p>Loading...</p> : <p>Log In</p>}
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
