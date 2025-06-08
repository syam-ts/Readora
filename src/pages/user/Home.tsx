import { useEffect, useState } from "react";
import HomeShimmer from "../../components/shimmer/HomeShimmer";
import { ArticleCard } from "../../components/article/ArticleCard";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";
import SearchArticle from "../../components/article/SearchArticle";

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
  const [emptyInput, setEmptyInput] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<number>(1);


useEffect(() => {
  const fetchArticles = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await apiInstance.get(
        `/article/viewAll?loadMoreIndex=${loadMore}`
      );
      
      setArticles(data.articles);
    } catch (err) {
      console.log("ERROR: ", err);
    } finally {
      setLoading(false);
    }
  };

  if (emptyInput) {
    fetchArticles();
  }
}, [emptyInput, loadMore]);



  return (
    <div>
      <section>
        <div className="grid justify-center pt-32 gap-3">
          <p className="font-mono text-center text-3xl nunito-regular">
            For You
          </p>
          {/* <hr className="w-[40rem] border-gray-400" /> */}
        </div>
      </section>
      <div className="pt-12">
        <SearchArticle articleSet={setArticles} inputEmpty={emptyInput} emptyInputSet={setEmptyInput} />
      </div>

      {/* Card section */}
      <section>
        {
          loading && <div><HomeShimmer /></div>
        }
        {
          articles.length !== 0 ? (
            <div className=" justify-center pt-12">
              <ArticleCard articles={articles} type="home" />
              {
                emptyInput && articles.length >= 9 &&
                <div className='flex justify-center'>
                  <button onClick={() => setLoadMore(loadMore + 1)} className="rounded-lg bg-[#b1afa1] py-2 px-10 montserrat-bold border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  hover:bg-sky-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                    Load More
                  </button>
                </div>
              }
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
