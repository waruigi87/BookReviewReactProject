import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface profilePayload{
    name: string | null,
    iconurl: string | null
}

const initialState : profilePayload = {
    name: Cookies.get("username") || null,
    iconurl: Cookies.get("iconurl") || null,
}

const profileSlice = createSlice({
    name : "profileSlice",
    initialState : initialState,
    reducers:{
        setProfile : (state, action : PayloadAction<{ name : string, iconurl: string | null}> ) => {
            state.name = action.payload.name;
            state.iconurl = action.payload.iconurl;
            Cookies.set("username", action.payload.name, { expires: 7 });
            if (action.payload.iconurl) {
                state.iconurl = action.payload.iconurl;
                Cookies.set("iconurl", action.payload.iconurl, { expires: 7 });
            }
            
            
        },
        clearProfile : (state) => {
            state.name = null;
            state.iconurl = null;
            Cookies.remove("username");
            Cookies.remove("iconurl");
        }
    }
})

export const {setProfile, clearProfile } = profileSlice.actions
export default profileSlice.reducer