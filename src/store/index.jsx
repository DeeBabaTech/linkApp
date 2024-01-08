import { configureStore } from "@reduxjs/toolkit";
import { formsReducer } from "./slices/formsSlice";
import { profileReducer } from "./slices/profileSlice";

export const store = configureStore({
    reducer: {
        forms: formsReducer,
        profile: profileReducer
    },
});

export * from './thunks/fetchforms'
export * from './thunks/addForm'
export * from './thunks/removeForm'
export * from './thunks/updateForm'
export * from './thunks/fetchProfile'