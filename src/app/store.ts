import { configureStore } from "@reduxjs/toolkit";
import pagingReducer from "../features/paging";
import authReducer from "../features/auth";
import profileReducer from "../features/profile"
const store = configureStore({
    reducer: {
        paging: pagingReducer,
        auth : authReducer,
        profile : profileReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;