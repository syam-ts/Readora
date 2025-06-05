import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UserState } from "../../config/UserStateConftg";
import { ArticleCard } from "../../components/article/ArticleCard"; 
import { apiInstance } from "../../api/axiosInstance/axiosInstance"; 
import HomeShimmer from "../../components/shimmer/HomeShimmer";
import SearchArticle from "../article/SearchArticle";

interface Article {
  userId: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    categories: string[];
    createdAt: Date;
}
 

const Home = () => {

  const [articles, setArticles] = useState<Article[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(loading) {

    }
  }, [loading]);

  useEffect(() => {
    try {
      const fetchArticles = async () => {
        const { data } = await apiInstance.get(
          `/article/viewAll`
        );

        console.log("The result: ", data);
        setArticles(data.articles);
      };

      fetchArticles();
      setLoading(false);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, []);

  return (
    <div>
      <section>
        <div className="grid justify-center pt-32 gap-3">
          <p className="font-mono text-center text-3xl nunito-regular">
            For You
          </p>
          <hr className="w-[40rem] border-gray-400" />
        </div>
      </section>
      <div className="pt-12">
        <SearchArticle articleSet={setArticles} />
      </div>

      {/* Card section */}
      <section>
        {
          loading && <div><HomeShimmer /></div>
        }
       {
        articles.length !== 0 ? (
           <div className="flex justify-center pt-12">
          <ArticleCard articles={articles} type="home" />
        </div>
        ) : (
            <div className="flex justify-center pt-12 h-screen">
              <p className="py-44 nunito-regular">No Article Found!</p>
        </div>
        )
       }
      </section>
    </div>
  );
};

export default Home;
