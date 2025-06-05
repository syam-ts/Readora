import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sonner } from "../sonner/Sonner";
import { DeleteArticle } from "./DeleteArticleModel";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";
// import { ThumbsUp } from "lucide-react";

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

    const publishArticle = async (articleId: string): Promise<void> => {
        try {
            const { data } = await apiInstance.put(`/article/publish/${articleId}`);

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
                    window.location.reload();
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
                    window.location.reload();
                }, 200);
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    };

    return (
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 nunito-regular">
            {isModalOpen}
            <Sonner />

            <div className="flex flex-wrap gap-8 w-4/5 justify-center mx-auto">
                {Object.entries(articles).map(([_, article]: any) => (
                    <div
                        key={article._id}
                        className="w-[22rem] rounded-xl overflow-hidden shadow border bg-white flex flex-col"
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
                            <h3 className="text-sm font-semibold text-gray-800 leading-tight truncate">
                                {article.title}
                            </h3>
                            <p className="text-xs text-gray-700 leading-snug line-clamp-3">
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

                        {/* Publish/Archive Button */}
                        {(type === "unpublished" || type === "published") && (
                            <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-100 to-gray-50 rounded-b-xl">
                                <button
                                    onClick={() =>
                                        type === "unpublished"
                                            ? publishArticle(article._id)
                                            : archiveArticle(article._id)
                                    }
                                    className="w-full py-2 rounded-xl bg-gray-600 text-white font-bold"
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
