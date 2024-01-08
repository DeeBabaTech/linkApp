import { createSlice } from '@reduxjs/toolkit'
import { fetchProfile } from '../thunks/fetchProfile';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        info: [],
    },
    extraReducers(builder) {
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.info = action.payload;
        })
    }
});

export const profileReducer = profileSlice.reducer