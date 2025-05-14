import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteArticle } from "./DeleteArticleModel";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";
import { toast } from "sonner";
import { Sonner } from "../sonner/Sonner";

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
    cb: any
}


export const ArticleCard: React.FC<ArticleCardProps> = ({ articles, type, cb }) => {
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);   

        cb="javascript"  

    const publishArticle = async (articleId: string): Promise<void> => {
        try{
          const { data } = await apiInstance.put(`/publishArticle/${articleId}`);

          if(data.success) {
            toast.error('Article Published', {
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
                window.location.reload()
            }, 200);
          }

        }catch(err) {
            console.log('ERROR: ',err);
        }
    };

    const archiveArticle = async (articleId: string): Promise<void> => {
        try{
          const { data } = await apiInstance.put(`/archiveArticle/${articleId}`);

          if(data.success) {
            toast.error('Article archived', {
                position: "top-center",
                style: {
                    backgroundColor: "green",
                    color: "white",
                    width: "12rem",
                    height: "3rem",
                    justifyContent: "center",
                    border: "none",
                }
            }); 
            setTimeout(() => {
                window.location.reload()
            }, 200);
          }

        }catch(err) {
            console.log('ERROR: ',err);
        }
    };

    return (
        <div className="flex flex-wrap gap-5 w-3/4 justify-center">{isModalOpen}
        <Sonner />
            {Object.entries(articles).map((article: any) => (
                <div className="flex flex-wrap ">
                    <div className="w-[350px] mx-auto border border-gray-300 nunito-regular">
                        <div className="relative flex w-full flex-col overflow-hidden bg-white text-gray-700">
                            <div className="relative m-0 overflow-hidden text-gray-700">
                                <div>
                                    { type === 'unpublished' && (
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
                                        className={`h-[14rem] w-full ${type !== 'unpublished' && 'hover:scale-110 transition-transform duration-400'}`}
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
                  {
                    type === 'unpublished' && (
                        <div>
                        <button onClick={() => publishArticle(article[1]._id)} className='w-full border-t border-gray-300 text-xl text-center py-2'> Publish </button>
                    </div> 
                    )
                  }
                  {
                    type === 'published' && (
                        <div>
                        <button onClick={() => archiveArticle(article[1]._id)} className='w-full border-t border-gray-300 text-xl text-center py-2'> Archive </button>
                    </div> 
                    )
                  }
                    </div>
                </div>
            ))}
        </div>
    );
};
