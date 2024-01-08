import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateForm = createAsyncThunk('forms/update', async form => {
    const response = await axios.put(`http://localhost:3005/forms/${form.id}`, form)

    return response.data
})

export { updateForm }