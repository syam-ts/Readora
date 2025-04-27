import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteModal } from "./DeleteArticleModel";

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-wrap gap-5 w-2/4 justify-center">
            {Object.entries(articles).map((article: any) => (
                <div className="flex flex-wrap ">
                    <div className="w-[300px] mx-auto border border-gray-300 nunito-regular">
                        <div className="relative flex w-full flex-col overflow-hidden bg-white text-gray-700">
                            <div className="relative m-0 overflow-hidden text-gray-700">
                                <div>
                                    {type === "myArticles" && (
                                        <div className="flex justify-between absolute w-full">
                                            <Link to={`/article?articleId=${article[1]._id}`} >
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/128/4476/4476157.png"
                                                    className="w-9 h-9 cursor-pointer bg-gray-200 rounded-full m-2"
                                                />
                                            </Link>

                                            <div>
                                                <button onClick={() => setIsModalOpen(true)}>
                                                    <img
                                                        src="https://cdn-icons-png.flaticon.com/128/8369/8369339.png"
                                                        className="w-9 h-9 cursor-pointer bg-gray-200 rounded-full m-2"
                                                    />
                                                </button>

                                                <DeleteModal
                                                    isOpen={isModalOpen}
                                                    onClose={() => setIsModalOpen(false)}
                                                >
                                                    <p className="text-lg font-medium mb-4 h-[5rem]">
                                                        Are you sure ?
                                                    </p>
                                                    <div className='flex gap-4 justify-end'>
                                                        <button
                                                            onClick={() => (false)}
                                                            className="bg-blue-500 text-white font-bold px-4 py-1 rounded-lg"
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            onClick={() => setIsModalOpen(false)}
                                                            className="bg-red-500 text-white font-bold px-4 py-1 rounded-lg"
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </DeleteModal>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Link to={`/article/${article[1]._id}`}>
                                    <img
                                        src={
                                            article[1].image ||
                                            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                                        }
                                        className="h-[12rem] w-full"
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
