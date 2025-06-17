import { apiInstance } from "../axios/axiosInstance/axiosInstance";



export const checkIfUserLikedArticle = async (
    articleId: string | undefined
): Promise<any> => {
    try {
        const response = await apiInstance.get(`/article/like/${articleId}`);
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};

export const likeArticle = async (
    articleId: string | undefined
): Promise<any> => {
    try {
        const response = await apiInstance.put(`/article/like/${articleId}`);
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};
