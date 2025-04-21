import { useEffect, useState } from "react"
import { ArticleCard } from "../components/ArticleCard"
import axios from "axios";


const Article = () => {
  
  const [articleType, setArticleType] = useState<string>('trending');
  const [articles, setArticles] = useState([]);

 useEffect(() => {
  try{
    const fetchArticles = async () => {
      const {data} = await axios.get(`http://localhost:3000/user/viewAllArticles/${articleType}`);

      setArticles(data.articles);
    };


    fetchArticles();

  }catch(err: unknown) {
    console.log("ERROR: ",err);
  }

 }, [articleType]);

 

  return (
    <div>
        <section>
          <div className='flex justify-center gap-4 py-3 pt-16'>
            <p className='font-thin text-xl cursor-pointer' onClick={() => setArticleType('trending')}>Trending Articles</p>
            <p className='font-thin text-xl cursor-pointer' onClick={() => setArticleType('myArticles')}>My Articles</p> 
          </div>
          <hr className='w-1/3 mx-auto' />
        </section>

        <section>
          <div className='flex justify-center py-20'>
            <ArticleCard articles={articles} />
          </div>
        </section>
    </div>
  )
}

export default Article