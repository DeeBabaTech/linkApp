import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const fetchProfile = createAsyncThunk('profile/fetch', async () => {
    const response = await axios.get('http://localhost:3005/profile');

    return response.data;
});


export { fetchProfile };