import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Favorite {
  favoriteMessages: string[];
}

const initialState: Favorite = {
  favoriteMessages: [],
};

export const favoriteMessagesSlice = createSlice({
  name: 'favoriteMessages',
  initialState,
  reducers: {
    addFavoriteMessages: (state, action: PayloadAction<string>) => {
      const userEmail = action.payload;
      if (state.favoriteMessages.includes(userEmail)) {
        state.favoriteMessages = state.favoriteMessages.filter((el) => el !== userEmail);
      } else {
        state.favoriteMessages = [...state.favoriteMessages, userEmail];
      }
    },
  },
});

export const { addFavoriteMessages } = favoriteMessagesSlice.actions;

export default favoriteMessagesSlice.reducer;
