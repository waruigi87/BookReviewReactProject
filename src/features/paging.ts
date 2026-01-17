import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const pagingSlice = createSlice({
    name : 'paging',
    initialState: {
        value : 0
    },
    reducers: {
        increment : state => {
            state.value += 1
        },
        decrement : state => {
            state.value = Math.max(0, state.value - 1)
        },
        incrementByAmount : (state, action : PayloadAction<number>) =>{
            state.value += action.payload
        },
        setOffset: (state, action: PayloadAction<number>) => {
        state.value = action.payload;
    }
    }

});

export const { increment, decrement, incrementByAmount, setOffset} = pagingSlice.actions
export default pagingSlice.reducer