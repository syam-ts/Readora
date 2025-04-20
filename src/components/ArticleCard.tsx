import axios from "axios";
import { useEffect, useState } from "react";

export const ArticleCard = () => {

    const [articles, setArticles] = useState({});

    useEffect(() => {
        try {
            const fetchArticles = async () => {

                const { data } = await axios.get('http://localhost:3000/user/viewAllArticles');

                console.log('The result: ', data)
                setArticles(data.articles)
            };

            fetchArticles();

        } catch (err) {
            console.log('ERROR: ', err);
        }
    }, []);


    return (
        <div className='flex flex-wrap gap-12 w-2/3 justify-center'>
            {
                Object.entries(articles).map((article: any) => (

                    <div className="flex flex-wrap ">
                        <div className="w-[300px] mx-auto border border-gray-300">

                            <div className="relative flex max-w-[24rem] flex-col overflow-hidden bg-white bg-clip-border text-gray-700 shadow-md">
                                <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent shadow-none bg-clip-border">
                                    <img
                                        src={'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80'}
                                        alt="ui/ux review check"
                                    />
                                </div>
                                <div className="p-6">
                                    <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                        {article[1].title}
                                    </h4>
                                    <p className="block line-clamp-1 mt-3 font-sans text-md text-gray-700">
                                        {article[1].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }

        </div>
    )
};