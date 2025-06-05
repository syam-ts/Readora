 import { useEffect, useState } from "react"; 
import { ArticleCard } from "../../components/article/ArticleCard"; 
import { apiInstance } from "../../api/axiosInstance/axiosInstance"; 
import HomeShimmer from "../../components/shimmer/HomeShimmer";
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
    try {
    
      const fetchArticles = async () => {
        const { data } = await apiInstance.get(
          `/article/viewAll?loadMoreIndex=${loadMore}`
        );

        console.log("The result: ", data);
        setArticles(data.articles);
      };

      fetchArticles();
      setLoading(false);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, [emptyInput, loadMore]);

  console.log('the emp', emptyInput)

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
           <div className='flex justify-center'>
            <p>{loadMore}</p>
             <button onClick={() => setLoadMore(loadMore+1)} className="rounded-lg bg-blue-600 py-2 px-10 montserrat-bold border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  hover:bg-sky-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                 Load More
            </button>
           </div>
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
