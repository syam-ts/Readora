
export interface UserState {
   currentUser: {
    _id: string;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    phone: number;
    dob: number;
    preferences: string[];
},
isUser?: boolean
}