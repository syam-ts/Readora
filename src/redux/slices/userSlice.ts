import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    phone: number;
    dob: number;
    preferences: string[];
}


interface UserState {
    currentUser: User | null;
    isUser: boolean;
};

const initialState: UserState = {
    currentUser: null,
    isUser: false, 
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: (state, action: PayloadAction<User>) => {
            state.currentUser= action.payload,
            state.isUser= true
        },
        signOutUser: (state) => {
            state.currentUser = null,
            state.isUser = false
        }
    }
});

export default userSlice.reducer;
export const {signInUser, signOutUser} = userSlice.actions;

