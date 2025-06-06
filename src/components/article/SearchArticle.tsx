import { useEffect, useState } from "react";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";

const SearchArticle = ({ articleSet, inputEmpty, emptyInputSet }: any) => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (input.length === 0) {
     
      emptyInputSet(true);
    } else {
   if(input.length !== 0) {
     emptyInputSet(false)
       const submitButton = async (): Promise<void> => {
        try {
          const { data } = await apiInstance.post(`/article/search/${input}`, {
            withCredentials: true,
          });

          console.log("result", data);
          articleSet(data.articles);
        } catch (err) {
          console.log("ERROR: ", err);
        }
      };
      submitButton();
   }
    }
  }, [input]);

 

  return (
    <div className="max-w-md mx-auto w-[24rem]">
      <div className="relative readora-theme flex items-center w-full h-10  px-16 rounded-lg focus-within:shadow-lg shadow-lg border-t border-r border-l overflow-hidden">
        <div className="grid place-items-center h-full w-12 left-0 absolute text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-white pr-2"
          type="text"
          id="search"
          placeholder="Search article.."
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchArticle;
