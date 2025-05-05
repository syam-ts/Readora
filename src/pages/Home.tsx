import { useEffect, useState } from "react";
import { ArticleCard } from "../components/article/ArticleCard"; 
import { useSelector } from "react-redux";
import { apiInstance } from "../api/axiosInstance/axiosInstance";
import { config } from "../config/config";
import { UserState } from "../config/UserStateConftg";

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
  const userId: string = useSelector((state: UserState) => state.currentUser._id);

  useEffect(() => {
    try {
      const fetchArticles = async () => {
        const { data } = await apiInstance.get(
          `${config.SERVER_URL}/articles/${userId}`
        );

        console.log("The result: ", data);
        setArticles(data.articles);
      };

      fetchArticles();
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, []);

  return (
    <div>
      <section>
        <div className="grid justify-center pt-16 gap-3">
          <p className="font-mono text-center text-2xl nunito-regular">
            For You
          </p>
          <hr className="w-[20rem]" />
        </div>
      </section>

      {/* Card section */}
      <section>
        <div className="flex justify-center pt-20">
          <ArticleCard articles={articles} type="home" />
        </div>
      </section>
    </div>
  );
};

export default Home;
