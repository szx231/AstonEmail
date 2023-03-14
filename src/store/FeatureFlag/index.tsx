import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface InitialState {
  featureFlagStatus: boolean | null;
  status: string;
  errorText: string;
  codeStatus: number | null;
}

export const featureFlag = createAsyncThunk('messageFeatureFlag/featureFlag', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<boolean>('/api/featureFlag');
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    return rejectWithValue(err.response);
  }
});

const initialState: InitialState = {
  featureFlagStatus: null,
  status: '',
  errorText: '',
  codeStatus: null,
};

export const featureFlagSlice = createSlice({
  name: 'featureFlag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(featureFlag.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(featureFlag.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.featureFlagStatus = action.payload;
      state.status = 'success';
    });
    builder.addCase(featureFlag.rejected, (state, action: PayloadAction<any>) => {
      state.codeStatus = action.payload.status;
      state.status = 'error';
      state.errorText = action.payload.message;
    });
  },
});

export default featureFlagSlice.reducer;
