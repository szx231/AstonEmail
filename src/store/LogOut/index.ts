import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLogOut = createAsyncThunk('logOut', async () => {
  const { data } = await axios.get<string>('/api/logOut');
  return data;
});

interface Data {
  statusLogOut: string;
}

const initialState: Data = {
  statusLogOut: 'loading',
};

export const fetchLogOutSlice = createSlice({
  name: 'fetchLogOut ',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogOut.pending, (state) => {
      state.statusLogOut = 'loading';
    });

    builder.addCase(fetchLogOut.fulfilled, (state) => {
      state.statusLogOut = 'success';
    });

    builder.addCase(fetchLogOut.rejected, (state) => {
      state.statusLogOut = 'error';
    });
  },
});

export default fetchLogOutSlice.reducer;
