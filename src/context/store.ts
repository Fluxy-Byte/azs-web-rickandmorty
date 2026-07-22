import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import movieWatchedSlice from "./slices/movieWatchedSlice";
import movieFavoriteSlice from "./slices/movieFavoritedSlice";
import { useDispatch, useSelector } from "react-redux";


export const store = configureStore({
    reducer: {
        user: userReducer,
        movieWatched: movieWatchedSlice,
        movieFavorite: movieFavoriteSlice,
    },
});

type RootState = ReturnType<typeof store.getState>
type Dispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<Dispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
