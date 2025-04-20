import { ArticleCard } from "../components/ArticleCard";




const Home = () => {


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
                <ArticleCard /> 
              </div>  
            </section>
        </div>
    );
}

export default Home;
