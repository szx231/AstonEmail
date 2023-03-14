import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserAuth {
  username: string;
  surname: string;
  email: string;
  role_name: string;
}

interface InitialState {
  user: UserAuth | null;
  status: string;
  errorText: string;
  codeStatus: 500 | null;
}

export const userIsAuth = createAsyncThunk('userIsAuthReq/userIsAuth', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<UserAuth>('/api/userIsAuth');
    return data;
  } catch (err) {
    if (err instanceof Error) {
      if (!err.response) {
        throw err;
      }
    }
    return rejectWithValue(err.response);
  }
});

const initialState: InitialState = {
  user: null,
  status: '',
  errorText: '',
  codeStatus: null,
};

export const userIsAuthSlice = createSlice({
  name: 'userIsAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userIsAuth.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(userIsAuth.fulfilled, (state, action: PayloadAction<UserAuth>) => {
      state.user = action.payload;
      state.status = 'success';
    });
    builder.addCase(userIsAuth.rejected, (state, action: PayloadAction<any>) => {
      state.codeStatus = action.payload.status;
      state.status = 'error';
      state.errorText = action.payload.message;
    });
  },
});

export default userIsAuthSlice.reducer;
