import axios from "axios";
import { config } from "../config/config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserState } from "../config/UserStateConftg";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Sonner } from "../components/sonner/Sonner";

const VerifyOtp = () => {
    const [otp, setOtp] = useState<number>(0);
    const navigate = useNavigate();
    const message = useLocation();

    const isUser = useSelector((state: UserState) => state.isUser);
    console.log('The data: ',message.state.message);

    useEffect(() => {
        if (isUser) navigate("/home");
    }, []);

    const submitForm = async () => {
        try {
            const body = {
                data: message.state.message.body,
                generatedOtp: message.state.message.generatedOtp,
                inputOtp: Number(otp)
            }
            console.log('The body from veiryf: ',body)
            const { data } = await axios.post(
                `${config.SERVER_URL}/verifyOtp`,
                {
                    body,
                },
                {
                    withCredentials: true,
                }
            ); 
 
            const userId =data.user.userId
            if (data.success) {
           navigate(`/preferences?userId=${userId}`);
            }
        } catch (error: unknown) {
            console.log('The error: ',error)
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
                    width: "16rem",
                    height: "3rem",
                    justifyContent: "center",
                    border: "none",
                },
            }); 
        }
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
                        Verify Otp
                    </h2>
                    <div className="mt-16">
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">
                                Enter Otp
                            </div>
                            <input
                                onChange={(e: any) => setOtp(e.target.value)}
                                name="otp"
                                className="w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="number"
                                placeholder="****"
                            />
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={submitForm}
                                className="bg-gray-600 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                            >
                                Verify
                            </button>
                        </div>

                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            <p className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                                <button>Resend Otp </button>
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

export default VerifyOtp;
