import { useEffect, useState } from "react";
import { ArticleCard } from "../components/ArticleCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Article = () => { 
  const [articles, setArticles] = useState([]);
  const userId = useSelector((state: any) => state.currentUser._id);

  useEffect(() => {
    try {
      const fetchArticles = async () => {
        const { data } = await axios.get(
          `http://localhost:3000/user/articles/${userId}`
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
      <section className="w-screen bg-gradient-to-r text-white py-12 px-6 mt-12">
        <div className="w-2/3 mx-auto bg-[#ffffff] shadow-2xl border-t border-gray-300 text-black rounded-2xl p-8 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Share Your Voice with the World
          </h2>
          <p className="text-base md:text-md mb-6 max-w-2xl">
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
            className="font-thin text-xl cursor-pointer" 
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

export default Article;
