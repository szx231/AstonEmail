import { configureStore } from '@reduxjs/toolkit';
import currentCategorySlice from './CurrentCategory/index';
import signUpRequestSlice from './Authorization/SignUp';
import signInRequestSlice from './Authorization/SignIn';
import userIsAuthSlice from './Authorization/CheckUserIsAuth';
import featureFlagSlice from './FeatureFlag';
import favoriteMessagesSlice from './Favorite';
import searchSlice from './Search';
import fetchLogOutSlice from './LogOut';
import currentMessageUniqueIdSlice from './CurrentMessageUniqueId';
import FilterUsersStatusSlice from './FilterUsersStatus';
import { emailsApi } from './EmailsApi';
import { customMiddleware } from './CustomMiddlware/PrintConsol';

export const store = configureStore({
  reducer: {
    [emailsApi.reducerPath]: emailsApi.reducer,
    featureFlagSlice,
    currentCategorySlice,
    signUpRequestSlice,
    signInRequestSlice,
    userIsAuthSlice,
    favoriteMessagesSlice,
    searchSlice,
    fetchLogOutSlice,
    currentMessageUniqueIdSlice,
    FilterUsersStatusSlice,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(customMiddleware, emailsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
