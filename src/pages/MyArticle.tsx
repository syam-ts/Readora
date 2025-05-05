import { useEffect, useState } from "react";
import { ArticleCard } from "../components/ArticleCard"; 
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiInstance } from "../api/axiosInstance/axiosInstance";
import { config } from "../config/config";
import { UserState } from "../config/UserStateConftg";

const MyArticle = () => { 
  const [articles, setArticles] = useState([]);
  const userId = useSelector((state: UserState) => state.currentUser._id);

  useEffect(() => {
    try {
      const fetchArticles = async () => {
        const { data } = await apiInstance.get(
          `${config.SERVER_URL}/user/articles/${userId}`
        );

        setArticles(data.articles);
      };

      fetchArticles();
    } catch (err: unknown) {
      console.log("ERROR: ", err);
    }
  }, []);

  return (
    <div>
      <section className="w-screen bg-gradient-to-r text-white py-12 px-6 mt-12 nunito-regular">
        <div className="w-2/3 mx-auto bg-[#ffffff] shadow-2xl border-t border-gray-300 text-black rounded-2xl p-6 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Share Your Voice with the World
          </h2>
          <p className="text-base md:text-md mb-6 w-full px-60">
            Add your own personal articles to inspire, educate, or entertain
            readers across the globe. Whether it's tech insights, travel
            experiences, or life lessons — your stories deserve to be heard.
          </p>
          <button className="bg-sky-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md cursor-pointer transition duration-300">
            <Link to='/articleCreation'>
            Create Your Article Here
            </Link>
          </button>
        </div>
      </section>

      <section>
        <div className="flex justify-center gap-10 py-3 pt-16">
        
          <p
            className="font-thin text-2xl cursor-pointer" 
          >
            My Articles
          </p>
        </div>
        <hr className="w-1/3 mx-auto" />
      </section>

      <section>
        <div className="flex justify-center py-20">
          <ArticleCard articles={articles} type='myArticles' />
        </div>
      </section>
    </div>
  );
};

export default MyArticle;
