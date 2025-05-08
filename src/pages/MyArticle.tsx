import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { config } from "../config/config";
import { useEffect, useState } from "react";
import { UserState } from "../config/UserStateConftg";
import { apiInstance } from "../api/axiosInstance/axiosInstance";
import { ArticleCard } from "../components/article/ArticleCard";

const MyArticle = () => {

  const [articles, setArticles] = useState([]);
  const [articleType, setArticleType] = useState<string>('unpublished');
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
  }, [articleType]);

  const articleTypeTitleStyle: string = 'text-black font-normal';



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
        <div> 
          <ul className='flex gap-12 justify-center text-center text-2xl text-gray-400 cursor-pointer font-thin'>
            <li>
              <p onClick={() => setArticleType('unpublished')} className={`${articleType === 'unpublished' && articleTypeTitleStyle}`}> Unpublished Articles</p>
            </li>
            <li>
              <p onClick={() => setArticleType('published')} className={`${articleType === 'published' && articleTypeTitleStyle}`}>  Published Articles</p> 
            </li>
            <li>
              <p onClick={() => setArticleType('deleted')} className={`${articleType === 'deleted' && articleTypeTitleStyle}`}> Deleted Articles</p> 
            </li>
          </ul>
        </div>

        <div className='pt-5'>
          <hr className="w-2/4 mx-auto border-black" />
        </div>
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
