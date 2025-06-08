import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Sonner } from "../sonner/Sonner";
import { DeleteArticle } from "./DeleteArticleModel";
import { Dispatch, SetStateAction, useState } from "react";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";

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
    articleType?: any;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ articles, type, articleType }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const publishArticle = async (articleId: string): Promise<void> => {
        try {
            const { data } = await apiInstance.put(`/article/publish/${articleId}`, {
                withCredentials: true,
            });

            if (data.success) {
                toast.error("Article Published", {
                    position: "top-center",
                    style: {
                        backgroundColor: "green",
                        color: "white",
                        width: "12rem",
                        height: "3rem",
                        justifyContent: "center",
                        border: "none",
                    },
                });
                setTimeout(() => {
                    articleType('published');
                }, 200);
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    };

    const archiveArticle = async (articleId: string): Promise<void> => {
        try {
            const { data } = await apiInstance.put(`/article/archive/${articleId}`);

            if (data.success) {
                toast.error("Article archived", {
                    position: "top-center",
                    style: {
                        backgroundColor: "green",
                        color: "white",
                        width: "12rem",
                        height: "3rem",
                        justifyContent: "center",
                        border: "none",
                    },
                });
                setTimeout(() => {
                      articleType('archived');
                }, 200);
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    };

    return (
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 baloo-bhai-2-main">
            {isModalOpen}
            <Sonner />

            <div className="flex flex-wrap gap-10 w-4/5 justify-center mx-auto">
                {Object.entries(articles).map(([_, article]: any) => (
                    <div
                        key={article._id}
                        className="w-[22rem] rounded-xl overflow-hidden border-black shadow-xl bg-white flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="relative h-48 w-full">
                            <Link to={`/article/${article._id}`}>
                                <img
                                    src={
                                        article.image ||
                                        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80"
                                    }
                                    alt="Article"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </Link>

                            {type === "unpublished" && (
                                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                                    <Link to={`/article?articleId=${article._id}`}>
                                        <div className="bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform">
                                            <img
                                                src="/edit-icon.png"
                                                alt="Edit"
                                                className="w-6 h-6"
                                            />
                                        </div>
                                    </Link>
                                    <button onClick={() => setIsModalOpen(true)}>
                                        <div className="rounded-full bg-transparent shadow-md hover:scale-105 transition-transform">
                                            <DeleteArticle articleId={article._id} />
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                            <h3 className="text-md font-semibold text-gray-800 leading-tight truncate">
                                {article.title}
                            </h3>
                            <p className="text-xs text-gray-700 leading-snug line-clamp-3 px-1">
                                {article.description}
                            </p>

                            {/* Likes */} 
                            {/* <div className="flex items-center justify-between text-gray-500 text-xs pt-2">
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>23</span>
                                </div>  =
                            </div> */}
                        </div>

                        <div className="flex justify-between px-5 pb-2">
                            <div className="flex">
                                <p className="text-xs">{new Date(article.createdAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}</p>
                            </div>

                            <div className="flex gap-5">
                                <p className="flex gap-2 text-xs">
                                    <img
                                        src="/like.png"
                                        className="h-3 w-3 hover:scale-130"
                                        alt="like-image"
                                    />
                                    {
                                        article.likes.total || 0
                                    }
                                </p>
                                <p className="flex gap-2 text-xs">
                                    <img
                                        src="/dislike.png"
                                        className="h-3 w-3 hover:scale-130"
                                        alt="dislike-image"
                                    />
                                    {
                                        article.dislikes.total || 0
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Publish/Archive Button */}
                        {(type === "unpublished" || type === "published") && (
                            <div className="p-5 rounded-b-xl">
                                <button
                                    onClick={() =>
                                        type === "unpublished"
                                            ? publishArticle(article._id)
                                            : archiveArticle(article._id)
                                    }
                                    className="w-full py-1 rounded-xl readora-theme text-white font-bold"
                                >
                                    {type === "unpublished" ? "Publish" : "Archive"}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
