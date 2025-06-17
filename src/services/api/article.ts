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


export const fetchArticle = async (
    articleId: string | undefined | null
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



export const createArticle = async (
   formData: any
): Promise<any> => {
    try {

 const response = await apiInstance.post(`/article/create`, formData, {
          withCredentials: true, 
        });

 
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};




export const editArticle = async (
   article: any
): Promise<any> => {
    try {

 const response = await apiInstance.put(
          `/article/edit`,
          article
        )

 
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};


