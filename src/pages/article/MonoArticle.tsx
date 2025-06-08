import { toast } from "sonner";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Sonner } from "../../components/sonner/Sonner";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";

interface Article {
    _id: string;
    title: string;
    subtitle?: string;
    author: string;
    image?: string;
    description: string;
    tags?: string[];
    category: string;
    likes: Likes;
    dislikes: Dislikes;
}

interface Likes {
    users: string[],
    total: number
}

interface Dislikes {
    users: string[],
    total: number
}

const MonoArticle: React.FC = () => {
    const [article, setArticle] = useState<Article>({
        _id: "",
        title: "",
        subtitle: "",
        author: "",
        image: "",
        description: "",
        tags: [""],
        category: "",
        likes: {
            users: [''],
            total: 0
        },
        dislikes: {
            users: [''],
            total: 0
        },
    });
    const [refreshPage, setRefreshPage] = useState<boolean>(false);
    const [hasLiked, setHasLiked] = useState(false);

    const { articleId } = useParams();

    useEffect(() => {
        try {
            const fetchArticles = async () => {
                const { data } = await apiInstance.get(
                    `/article/view/${articleId}`
                );

                setArticle(data.article);
            };

            fetchArticles();

            setRefreshPage(false);
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }, [refreshPage]);


    //checks if user already liked or not
    useEffect(() => {
        try {
            const checkIfUserLikedArticle = async () => {
                const { data } = await apiInstance.get(`article/like/${articleId}`);

                console.log('The data from checking liked or not: ', data)
                //data if tue then state true or false
                if (data.result) {
                    setHasLiked(true)
                }
            }

            checkIfUserLikedArticle();
        } catch (err) {
            console.log('ERROR: ', err)
        }
    }, [refreshPage]) 

    const likeArticle = async (articleId: string) => {
        try {
            const { data } = await apiInstance.put(
                `/article/like/${articleId}`
            );

            console.log("The result: ", data);
            if (data.success) {
                toast.success('liked the image', {
                    position: "bottom-center",
                    style: {
                        backgroundColor: "#00FF00",
                        color: "black",
                        width: "10rem",
                        height: "3rem",
                        justifyContent: "center",
                        border: "none",
                    }
                })
                setRefreshPage(true);
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    };

    const dislikeArticle = async (articleId: string) => {
        try {
            const { data } = await apiInstance.put(
                `/article/dislike/${articleId}`
            );

            console.log("The result: ", data);
            if (data.success) {
                toast.success('disliked the image', {
                    position: "bottom-center",
                    style: {
                        backgroundColor: "#FCF259",
                        color: "black",
                        width: "12rem",
                        height: "3rem",
                        justifyContent: "center",
                        border: "none",
                    }
                })
                setRefreshPage(true);
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-22 font-sans text-gray-800 baloo-bhai-2-main">
            <Sonner />
            <h1 className="text-4xl font-semibold mb-2">{article.title}</h1>

            <div className="text-sm text-gray-400 mb-10">By: {article.author}</div>

            <div className="mb-10">
                <img
                    src={
                        article.image ||
                        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                    }
                    alt="Article visual"
                    className="w-full rounded-lg object-cover"
                />
            </div>

            <div className="text-base flex justify-between leading-relaxed whitespace-pre-line mb-10">
                <p>{article.subtitle}</p>
                <div className="flex justify-between gap-10 pr-3">
                    {
                        hasLiked ? <div>
                            <img
                                src="/liked.png"
                                className="h-6 w-6 hover:scale-130"
                                alt="liked-image"
                            />
                        </div>
                            :
                            <div>
                                <button
                                    className="cursor-pointer"
                                    onClick={() => likeArticle(article._id)}
                                >
                                    <img
                                        src="/like.png"
                                        className="h-6 w-6 hover:scale-130"
                                        alt="like-image"
                                    />
                                </button>
                            </div>
                    }
                    <button
                        className="cursor-pointer"
                        onClick={() => dislikeArticle(article._id)}
                    >
                        <img
                            src="/dislike.png"
                            className="h-6 w-6 hover:scale-130"
                            alt="dislike-image"
                        />
                    </button>
                </div>
            </div>

            <div className="text-base leading-relaxed whitespace-pre-line text-black mb-10">
                {article.description}
            </div>

            <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-1">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {article.tags &&
                        article?.tags.map((tag) => (
                            <span
                                key={tag}
                                className="readora-theme text-sm px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
                <span className="font-medium text-gray-700">Category:</span>
                {article.category}
            </div>
            <div className="mt-6 flex justify-end gap-5 text-sm text-gray-500">
                <span className="font-medium text-gray-700">Like: {article.likes.total || 0}</span>
                <span className="font-medium text-gray-700">
                    Dislike: {article.dislikes.total || 0}
                </span>
            </div>
        </div>
    );
};

export default MonoArticle;
