import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};
const watchlistSlice = createSlice({
    name:'watchlist',
    initialState,
    reducers: {
        addToWatchlist: (state, action) => {
            const movie = action.payload;
            const exists = state.items.some(item => item.id == movie.id);
            if(!exists){
                state.items.push(movie);
            }
        },
        removeFromWatchlist: (state, action) => {
            const movieId = action.payload;
            state.items = state.items.filter(item => item.id !== movieId);
        },
    },
});
export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
