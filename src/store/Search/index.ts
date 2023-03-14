import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Search {
  inputValue: string;
}

const initialState: Search = {
  inputValue: '',
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    inputChangeValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    removeInputField: (state) => {
      state.inputValue = '';
    },
  },
});

export const { inputChangeValue, removeInputField } = searchSlice.actions;

export default searchSlice.reducer;
