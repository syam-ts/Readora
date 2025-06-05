import axios from "axios"; 
import { useState } from "react";  
import { useNavigate, useSearchParams } from "react-router-dom";
import { config } from "../../config/config";
import { categories } from "../../utils/constants/categories";

const Preferences = () => {
  const [preferences, setPrefernces] = useState<string[]>([]); 
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  const addPrefences = (value: string) => {
    setPrefernces((prev) =>
      prev.includes(value)
        ? prev.filter((pref) => pref !== value)
        : [...prev, value]
    );
  };

  const submitFunction = async () => {
    try {
      const { data } = await axios.put(
        `${config.SERVER_URL}/user/preferences/${userId}`,
        {
          preferences,
        }
      );

      console.log("The response: ", data);
      if (data.success) {
        navigate("/login");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen bg-stone-100">
      <section>
        <div className="grid justify-center pt-44">
          <span className="text-2xl">Select Your Desired Categories - atleast 3 </span>
          <hr className="w-full my-5 border-black" />
        </div>
      </section>

      <section>
        <div className="w-full flex justify-center pt-20">
          <div className="flex flex-wrap gap-10 w-2/4 justify-center ">
            {categories.map((category: string) => (
              <div>
                <p
                  onClick={() => addPrefences(category)}
                  className={`${preferences.includes(category) && "bg-green-500"
                    } bg-gray-400 text-white nunito-regular rounded-xl px-4 py-1 font-sans text-lg hover:text-black cursor-pointer`}
                >
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        {preferences.length >= 3 && preferences.length <= 5 && (
          <div className="flex justify-center py-12">
            <button
              onClick={() => submitFunction()}
              className="rounded-xl bg-sky-500 py-1.5 px-5 font-bold border border-transparent text-center text-md text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
            >
              Proceed
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Preferences;
