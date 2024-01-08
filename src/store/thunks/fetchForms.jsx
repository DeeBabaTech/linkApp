import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const fetchForms = createAsyncThunk('forms/fetch', async () => {
    const response = await axios.get('http://localhost:3005/forms');

    return response.data;
});


export { fetchForms };