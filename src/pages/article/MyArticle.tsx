import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { ArticleCard } from "../../components/article/ArticleCard";
import HomeShimmer from "../../components/shimmer/HomeShimmer";
import { apiInstance } from "../../services/axios/axiosInstance/axiosInstance";

const MyArticle = () => {
  const [articles, setArticles] = useState([]);
  const [articleType, setArticleType] = useState<string>("unpublished");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); 
        try {
        const { data } = await apiInstance.get(`/article/viewMy/${articleType}`);

        setArticles(data.articles);
        
      } catch (err: unknown) {
        console.log("ERROR: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [articleType]);

  const articleTypeTitleStyle: string = "text-black font-normal";

  return (
    <div className="overflow-hidden">
      <section className="w-screen text-white py-16 px-4 mt-16 baloo-bhai-2-main">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl border-t border-gray-300 text-black rounded-2xl p-4 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Share Your Voice with the World
          </h2>
          <p className="text-base sm:text-md mb-6 max-w-2xl">
            Add your own personal articles to inspire, educate, or entertain
            readers across the globe. Whether it's tech insights, travel
            experiences, or life lessons — your stories deserve to be heard.
          </p>
          <Link to="/articleCreation">
            <button className="readora-theme hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
              Create Your Article Here
            </button>
          </Link>
        </div>
      </section>

      <section className="w-full mt-16">
        <div>
          <ul className="flex flex-wrap gap-8 justify-center text-center text-lg sm:text-xl md:text-2xl text-gray-400 cursor-pointer font-light">
            <li>
              <p
                onClick={() => setArticleType("unpublished")}
                className={
                  articleType === "unpublished" ? articleTypeTitleStyle : ""
                }
              >
                Unpublished Articles
              </p>
            </li>
            <li>
              <p
                onClick={() => setArticleType("published")}
                className={
                  articleType === "published" ? articleTypeTitleStyle : ""
                }
              >
                Published Articles
              </p>
            </li>
            <li>
              <p
                onClick={() => setArticleType("archived")}
                className={
                  articleType === "archived" ? articleTypeTitleStyle : ""
                }
              >
                Archived Articles
              </p>
            </li>
          </ul>
        </div>

        {/* <div className="pt-5">
          <hr className="w-3/4 md:w-2/4 mx-auto border-black" />
        </div> */}
      </section>

      <section>
        {
          loading && <HomeShimmer />
        }
        {articles.length === 0 ? (
          <div className="flex justify-center my-[10rem]">Empty </div>
        ) : (
          <div className="w-4/5 justify-center mx-auto py-20">
            <ArticleCard
              articles={articles}
              type={articleType}
              articleType={setArticleType}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default MyArticle;
