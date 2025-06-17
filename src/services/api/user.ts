import axios from "axios";
import { config } from "../../config/config";


 
 

    export const userLogin = async(email: string, password: string ): Promise<any> => {
        try { 
            const response = await axios.post(
                `${config.SERVER_URL}/user/login`,
                {
                    email,
                    password
                },
                {
                    withCredentials: true,
                }
            );

            return response;
        } catch (err: any) {
            
            if(!err.response.data.success){
                return err.response.data
            }
         }
    }

    export const userSignup = () =>{
        
    }
 



export default {
    userLogin,
};