import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteArticle } from "./DeleteArticleModel";

interface Article {
    userId: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    categories: string[];
    createdAt: Date;
}

interface ArticleCardProps {
    articles: Article[];
    type: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ articles, type }) => {
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

    return (
        <div className="flex flex-wrap gap-5 w-2/4 justify-center">
            {Object.entries(articles).map((article: any) => (
                <div className="flex flex-wrap ">
                    <div className="w-[300px] mx-auto border border-gray-300 nunito-regular">
                        <div className="relative flex w-full flex-col overflow-hidden bg-white text-gray-700">
                            <div className="relative m-0 overflow-hidden text-gray-700">
                                <div>
                                    { type === 'myArticles' && (
                                        <div className="flex justify-between absolute w-full">
                                            <Link to={`/article?articleId=${article[1]._id}`} >
                                                <img
                                                    src="/edit-icon.png"
                                                    className="w-9 h-9 cursor-pointer bg-gray-200 rounded-full m-2"
                                                />
                                            </Link>

                                            <div>
                                                <button onClick={() => setIsModalOpen(true)}>
                                                    <DeleteArticle articleId={article[1]._id} /> 
                                                </button>

                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Link to={`/article/${article[1]._id}`}>
                                    <img
                                        src={
                                            article[1].image ||
                                            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                        }
                                        className={`h-[12rem] w-full ${type !== 'myArticles' && 'hover:scale-110 transition-transform duration-400'}`}
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
