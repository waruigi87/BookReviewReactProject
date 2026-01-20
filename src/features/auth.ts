import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export interface AuthState{
    token : string | null
}

const initialState : AuthState = {
    token: Cookies.get("token") || null,
}


const authSlice = createSlice({
    name: "AuthSlice",
    initialState : initialState,
    reducers : {
        setAuth : (state, action: PayloadAction<{ token: string}> ) => {
            state.token = action.payload.token;
            Cookies.set("token",action.payload.token);
            
        },
        clearAuth : (state) => {
            state.token = null;
            
            Cookies.remove("token");

        }

    } 
})

export const { setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;