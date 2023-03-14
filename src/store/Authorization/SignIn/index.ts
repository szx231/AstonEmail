import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface SignInUser {
  email: string;
  password: string;
}

export const signInRequest = createAsyncThunk('signIn/SignInRequest', async (user: SignInUser, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<SignInUser>('/api/authorization/signIn', {
      user,
    });
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

interface InititalState {
  user: SignInUser | null;
  status: string;
  errorText: string;
}

const initialState: InititalState = {
  user: null,
  status: '',
  errorText: '',
};

export const signInRequestSlice = createSlice({
  name: 'signInRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInRequest.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(signInRequest.fulfilled, (state, action: PayloadAction<SignInUser>) => {
      state.user = action.payload;
      state.status = 'success';
    });

    builder.addCase(signInRequest.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.errorText = action.payload;
    });
  },
});

export default signInRequestSlice.reducer;
