import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState{
    token : string | null,
    username: string | null
}

const initialState : AuthState = {
    token : localStorage.getItem("token"),
    username : localStorage.getItem("username")
}


const authSlice = createSlice({
    name: "AuthSlice",
    initialState : initialState,
    reducers : {
        setAuth : (state, action: PayloadAction<{ token: string; username: string}> ) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem("token", action.payload.token);
        },
        clearAuth : (state) => {
            state.token = null;
            state.username = null;
            localStorage.removeItem("token");
        }

    } 
})

export const { setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;