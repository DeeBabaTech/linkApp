import { createSlice } from '@reduxjs/toolkit'
import { fetchForms } from '../thunks/fetchforms';
import { addForm } from '../thunks/addForm';
import { removeForm } from '../thunks/removeForm';
import { updateForm } from '../thunks/updateForm';

const formsSlice = createSlice({
    name: 'forms',
    initialState: {
        data: [],
    },
    extraReducers(builder) {
        builder.addCase(fetchForms.fulfilled, (state, action) => {
            state.data = action.payload;
        });

        builder.addCase(addForm.fulfilled, (state, action) => {
            state.data.push(action.payload)
        })

        builder.addCase(removeForm.fulfilled, (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        })

        builder.addCase(updateForm.fulfilled, (state, action) => {
            const index = state.data.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.data[index] = action.payload
            }
        })

    }
});

export const formsReducer = formsSlice.reducer