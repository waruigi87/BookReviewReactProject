import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const pagingSlice = createSlice({
    name : 'paging',
    initialState: {
        page : 1
    },
    reducers: {
        nextPage: (state) => {
            state.page += 1;
        },
        prevPage: (state) => {
            if (state.page > 1) {
                state.page -= 1;
            }
        },
        goToPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        resetPage: (state) => {
            state.page = 1;
        }
    }
    

});

export const { nextPage, prevPage, goToPage, resetPage } = pagingSlice.actions;
export default pagingSlice.reducer;