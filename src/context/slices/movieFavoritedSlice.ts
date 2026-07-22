import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialState: string[] = []

const movieFavoriteSlice = createSlice({
    name: "moviesFavorite",
    initialState,
    reducers: {

        addMovieFavorite(state, { payload }: PayloadAction<string>) {
            if (!state.includes(payload)) {
                state.push(payload);
            }
        },

        removeMovieFavorite(state, { payload }: PayloadAction<string>) {
            return state.filter((movieId) => movieId != payload);
        },
    },
});


export const { addMovieFavorite, removeMovieFavorite } = movieFavoriteSlice.actions;
export default movieFavoriteSlice.reducer;