import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Initial } from './types';

const initialState: Initial = {
  category: 'Входящие',
  categoryIndex: 0,
};

export const currentCategorySlice = createSlice({
  name: 'heroList',
  initialState,
  reducers: {
    changeCurrentCategory: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.category = action.payload;
      }
    },
    changeIndexCategory: (state, action: PayloadAction<number>) => {
      state.categoryIndex = action.payload;
    },
  },
});

export const { changeCurrentCategory, changeIndexCategory } = currentCategorySlice.actions;

export default currentCategorySlice.reducer;
