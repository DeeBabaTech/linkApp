import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { faker } from '@faker-js/faker';

const addForm = createAsyncThunk('forms/add', async () => {
  const response = await axios.post('http://localhost:3005/forms', {
    platform: "", link: "", icon: ""
  });

  return response.data;
});

export { addForm };
