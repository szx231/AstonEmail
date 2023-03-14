import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignUpUser {
  name: string;
  surname: string;
  email: string;
  role: string;
}

export const signUpRequest = createAsyncThunk('signUp/SignUpRequest', async (user: SignUpUser, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<SignUpUser>('/api/authorization/signUp', {
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

interface InitialState {
  user: SignUpUser | null;
  status: string;
  errorText: string;
}

const initialState: InitialState = {
  user: null,
  status: '',
  errorText: '',
};

export const signUpRequestSlice = createSlice({
  name: 'signUpRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpRequest.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(signUpRequest.fulfilled, (state, action: PayloadAction<SignUpUser>) => {
      state.user = action.payload;
      state.status = 'success';
    });

    builder.addCase(signUpRequest.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.errorText = action.payload;
    });
  },
});

export default signUpRequestSlice.reducer;
