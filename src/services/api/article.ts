import { apiInstance } from "../axios/axiosInstance/axiosInstance";



export const fetchAllArticles = async (
    loadMore: number
): Promise<any> => {
    try {
        const response = await apiInstance.get(`/article/viewAll?loadMoreIndex=${loadMore}`);
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};


export const fetchArticles = async (
    articleId: string | undefined
): Promise<any> => {
    try {
        const response = await apiInstance.get(`/article/view/${articleId}`);
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};


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
