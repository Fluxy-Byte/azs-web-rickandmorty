import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialState: string[] = []

const movieWatchedSlice = createSlice({
    name: "moviesWatched",
    initialState,
    reducers: {

        addMovieWatched(state, { payload }: PayloadAction<string>) {
            if (!state.includes(payload)) {
                state.push(payload);
            }
        },

        removeMovieWatched(state, { payload }: PayloadAction<string>) {
            return state.filter((movieId) => movieId != payload);
        },
    },
});


export const { addMovieWatched, removeMovieWatched } = movieWatchedSlice.actions;
export default movieWatchedSlice.reducer;