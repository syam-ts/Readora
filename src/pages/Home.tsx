import { useEffect, useState } from "react";
import { ArticleCard } from "../components/ArticleCard";
import axios from "axios";




const Home = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    try {
        const fetchArticles = async () => {

            const { data } = await axios.get('http://localhost:3000/user/viewAllArticles/home');

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
                 <p className='font-mono text-center'>Explore</p>
                 <hr className='w-[20rem]' />
              </div>
            </section>

            {/* Card section */}
            <section>
              <div className='flex justify-center pt-44'>
                <ArticleCard articles={articles} /> 
              </div>  
            </section>
        </div>
    );
}

export default Home;
