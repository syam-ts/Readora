import axios from "axios";
import { config } from "../../config/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../../config/UserStateConftg"; 
import { userSignupSchema } from "../../utils/validation/signupSchema";
import { ErrorComponent } from "../../components/errorComponents/ErrorComponent";

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
    const [loading, setLoading] = useState<boolean>(false);
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
                setLoading(true);
                const { data } = await axios.post(`${config.SERVER_URL}/signup`, {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

               
                console.log("the result", data);
                if (data.success) {
                    navigate(`/verify`, {state: {message: data.user}});
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
        <div className="h-screen flex flex-col lg:flex-row   ">
  {/* Form Section */}
  <div className="w-full lg:w-1/2 flex justify-center items-center p-6 sm:p-12">
    <div className="w-full max-w-md">
      <h2 className="text-3xl sm:text-4xl text-indigo-900 font-semibold mb-10">Sign up</h2>

      {/* Name Input */}
      <div>
        <label className="text-sm font-bold text-gray-700">Name</label>
        <input
          onChange={handleChange}
          name="name"
          className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          type="text"
          placeholder="vinaykumar"
        />
        <ErrorComponent
          error={error}
          e1="Name is required"
          e2="Invalid name (minimum 5 characters)"
          e3="Invalid name (maximum 20 characters)"
        />
      </div>

      {/* Email Input */}
      <div className="mt-6">
        <label className="text-sm font-bold text-gray-700">Email Address</label>
        <input
          onChange={handleChange}
          name="email"
          className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          type="email"
          placeholder="vinaykumar@gmail.com"
        />
        <ErrorComponent
          error={error}
          e1="Email is required"
          e2="Email is invalid"
          e3="Invalid Mail"
        />
      </div>

      {/* Password Input */}
      <div className="mt-6">
        <label className="text-sm font-bold text-gray-700">Password</label>
        <input
          onChange={handleChange}
          name="password"
          className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          type="password"
          placeholder="Enter your password"
        />
        <ErrorComponent
          error={error}
          e1="Password is required"
          e2="Include at least one number, uppercase letter"
          e3="Incorrect (minimum 8 characters)"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          onClick={submitForm}
          className="bg-gray-600 text-white p-3 w-full rounded-full font-semibold hover:bg-indigo-600 transition"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </div>

      {/* Login Redirect */}
      <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-600 hover:text-indigo-800 underline"
        >
          Login
        </Link>
      </div>
    </div>
  </div>

  {/* Image Section */}
  <div className="lg:block lg:w-1/2">
    <img
      src="https://img.freepik.com/free-photo/concept-fake-news_23-2148837021.jpg?ga=GA1.1.971265415.1746433248&semt=ais_hybrid&w=740"
      alt="Signup Illustration"
      className="h-full w-full object-cover"
    />
  </div>
</div>

    );
};

export default SignupPage;
