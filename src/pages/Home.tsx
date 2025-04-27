import { useEffect, useState } from "react";
import { ArticleCard } from "../components/ArticleCard";
import axios from "axios";
import { useSelector } from "react-redux"; 


const Home = () => {

  const [articles, setArticles] = useState([]);
  const userId = useSelector((state: any) => state.currentUser[0]._id);

  useEffect(() => {
    try {
      const fetchArticles = async () => {

        const { data } = await axios.get(`http://localhost:3000/articles/${userId}`);

        console.log('The result: ', data)
        setArticles(data.articles)
      };

      fetchArticles();

    } catch (err) {
      console.log('ERROR: ', err);
    }
  }, []);


  return (
    <div>
      <section>
        <div className='grid justify-center pt-16 gap-3'>
          <p className='font-mono text-center text-2xl nunito-regular'>For You</p>
          <hr className='w-[20rem]' />
        </div>
      </section>

      {/* Card section */}
      <section>
        <div className='flex justify-center pt-20'>
          <ArticleCard articles={articles} type='home' />
        </div>
      </section>
    </div>
  );
}

export default Home;
