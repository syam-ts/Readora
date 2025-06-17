import { apiInstance } from "../axios/axiosInstance/axiosInstance";



export const checkIfUserDislikedArticle = async (
    articleId: string | undefined
): Promise<any> => {
    try {
        const response = await apiInstance.get(`/article/dislike/${articleId}`);
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};

export const dislikeArticle = async (
    articleId: string | undefined
): Promise<any> => {
    try {
        const response = await apiInstance.put(`/article/dislike/${articleId}`);
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};
