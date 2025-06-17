import axios from "axios";
import { config } from "../../config/config";
import { apiInstance } from "../axios/axiosInstance/axiosInstance";



export const userLogin = async (
    email: string,
    password: string
): Promise<any> => {
    try {
        const response = await axios.post(
            `${config.SERVER_URL}/user/login`,
            {
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};

export const userSignup = async (
    name: string,
    email: string,
    password: string
): Promise<any> => {
    try {
        const response = await axios.post(
            `${config.SERVER_URL}/user/signup`,
            {
                name,
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (err: any) {
        console.log("ERROR FROM SERVICE: ", err);

        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};

export const fetchUserData = async (): Promise<any> => {
    try {
        const response = await apiInstance.get(`/user/profile`);
        console.log("HER : ", response);
        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};

export const profileEdit = async (
    name: string,
    profilePicture: string,
    phone: number | null,
    dob: number | null,
    gender: string,
    location: string,
    preferences: string[]
): Promise<any> => {
    try {
        const response = await apiInstance.put(
            "/user/profile",
            {
                name,
                profilePicture,
                phone,
                dob,
                gender,
                location,
                preferences,
            },
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (err: any) {
        if (!err.response.data.success) {
            return err.response.data;
        }
    }
};
