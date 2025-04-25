import { useState } from "react";
import { Link } from "react-router-dom";


interface Article {
    userId: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    categories: string[];
    createdAt: Date
}

interface ArticleCardProps {
    articles: Article[],
    type: string
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ articles, type }) => {
 

    return (
        <div className="flex flex-wrap gap-12 w-2/3 justify-center">
            {Object.entries(articles).map((article: any) => (
                <div className="flex flex-wrap ">
                    <div className="w-[300px] mx-auto border border-gray-300 nunito-regular">
                        <div className="relative flex max-w-[24rem] flex-col overflow-hidden bg-white text-gray-700">
                            <div className="relative m-0 overflow-hidden text-gray-700">
                                <div>
                                    {
                                        type === 'myArticles' && (
                                            <div className='flex justify-between absolute w-full'>
                                                <img src='https://cdn-icons-png.flaticon.com/128/815/815497.png' className='w-7 h-7 cursor-pointer bg-gray-400' />
                                                <img src='https://cdn-icons-png.flaticon.com/128/17286/17286297.png' className='w-7 h-7 cursor-pointer bg-gray-400' />
                                            </div>
                                        )
                                    }
                                </div>
                                <Link to={`/monoArticle/${article[1]._id}`}>
                                    <img
                                        src={article[1].image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80'}
                                        className='h-[13rem] w-full'
                                        alt="article image"
                                    />
                                </Link>
                            </div>
                            <div className="p-6 w-full">
                                <h4 className="font-sans line-clamp-1 text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    {article[1].title}
                                </h4>
                                <span className="line-clamp-4 mt-3 font-sans text-sm text-gray-700">
                                    {article[1].description}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
