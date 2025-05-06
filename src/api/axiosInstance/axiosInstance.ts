import axios from "axios";
import { signOutUser } from "../../redux/slices/userSlice";
import store from "../../redux/store"; 
 

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ORIGIN,
  withCredentials: true,
});

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ORIGIN,
  withCredentials: true,
});

// Request interceptor
apiInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (originalRequest._retry) {
        console.log("Redirecting to login due to failed token refresh");

        localStorage.removeItem("accessToken");
        store.dispatch(signOutUser());

       window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const { data } = await refreshInstance.post("/refreshToken");
        const { accessToken } = data;

        if (!accessToken) {
          throw new Error("No new access token received");
        }

        localStorage.setItem("accessToken", accessToken);
 
        apiInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // Retry original request with new token
        return apiInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        localStorage.removeItem("accessToken");
        
        store.dispatch(signOutUser());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);