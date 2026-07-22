import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserConfig = {
    id: string
    name: string
    theme: string
}

const initialState: UserConfig = {
    theme: "dark",
    id: "",
    name: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        updateNameUser(state, { payload }: PayloadAction<string>) {
            state.name = payload ?? "";
        },

        updateThemeUser(state, { payload }: PayloadAction<string>) {
            state.theme = payload ?? "";
        },

        createUser(state, { payload }: PayloadAction<UserConfig>) {
            state.id = payload.id;
            state.name = payload.name;
            state.theme = payload.theme;
        }
    },
});


export const { updateNameUser, updateThemeUser, createUser } = userSlice.actions;
export default userSlice.reducer;