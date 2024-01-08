import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeForm = createAsyncThunk('forms/delete', async (formId) => {
    await axios.delete(`http://localhost:3005/forms/${formId}`)

    return formId
})

export { removeForm }   