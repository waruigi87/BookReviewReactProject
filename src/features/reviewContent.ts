import { type bookListResponse } from './../types/contents';
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ReviewState{
    value: bookListResponse[]
}

const initialState : ReviewState = {
    value : []
}

export const ReviewContentSlice = createSlice({
    name: 'reviewContentSlice',
    initialState : initialState ,
    reducers :{
        addBook: (state, action : PayloadAction<bookListResponse[]>) => {
            state.value.push(...action.payload);
        },
        setBooks: (state, action: PayloadAction<bookListResponse[]>) => {
            state.value = action.payload;
        }
    }

})

export const { addBook, setBooks} = ReviewContentSlice.actions;
export default ReviewContentSlice.reducer;
