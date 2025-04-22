import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Article {
    title: string;
    subtitle?: string;
    author: string;
    image?: string;
    description: string;
    tags?: string[];
    category: string;
}

const MonoArticle: React.FC = () => {
    const [article, setArticle] = useState<Article>({
        title: "",
        subtitle: "",
        author: "",
        image: "",
        description: "",
        tags: [""],
        category: "",
    });

    const { articleId } = useParams();

    useEffect(() => {
        try {
            const fetchArticles = async () => {
                const { data } = await axios.get(
                    `http://localhost:3000/user/monoArticleView/${articleId}`
                );

                setArticle(data.article);
            };

            fetchArticles();
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto px-4 py-12 font-sans text-gray-800">
            <h1 className="text-4xl font-semibold mb-2">{article.title}</h1>
            {article.subtitle && (
                <p className="text-lg text-gray-500 mb-6">{article.subtitle}</p>
            )}

            <div className="text-sm text-gray-400 mb-10">By {article.author}</div>

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

            <div className="text-base leading-relaxed whitespace-pre-line mb-10">
                {article.description}
            </div>

            <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-1">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {article.tags &&
                        article?.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-100 text-sm px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
                <span className="font-medium text-gray-700">Category:</span>{" "}
                {article.category}
            </div>
        </div>
    );
};

export default MonoArticle;
