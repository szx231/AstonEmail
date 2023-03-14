import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  filter: string;
}

const initialState: InitialState = {
  filter: '',
};

export const filterUsersStatusSlice = createSlice({
  name: 'filterUsersStatus',
  initialState,
  reducers: {
    addFilterStatus: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { addFilterStatus } = filterUsersStatusSlice.actions;

export default filterUsersStatusSlice.reducer;
