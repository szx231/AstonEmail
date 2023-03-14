import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ResponseUsers } from './types';

export const selectLogOut = (state: RootState) => state.fetchLogOutSlice;
export const selectFeatureFlag = (state: RootState) => state.featureFlagSlice;
export const selectCategory = (state: RootState) => state.currentCategorySlice;
export const selectСurrentMessageUniqueId = (state: RootState) => state.currentMessageUniqueIdSlice;
export const selectSignUp = (state: RootState) => state.signUpRequestSlice;
export const selectSignIn = (state: RootState) => state.signInRequestSlice;
export const selectIsAuth = (state: RootState) => state.userIsAuthSlice;
export const selectInputValue = (state: RootState) => state.searchSlice;

export const selectFilterUsersStatus = (state: RootState) => state.FilterUsersStatusSlice.filter;

export const selectUsers = (state: RootState) => state.emailsApi.queries['getUsersInfo(undefined)']?.data;

export const selectUsersSorted = createSelector([selectUsers, selectFilterUsersStatus], (users, filterStatus) => {
  if (filterStatus === 'AZ') {
    return users.slice().sort((a, b) => a.username.localeCompare(b.username));
  }

  if (filterStatus === 'ZA') {
    return users.slice().sort((a, b) => b.username.localeCompare(a.username));
  }

  if (filterStatus === 'NUMBER') {
    return users.slice().sort((a, b) => a.user_id - b.user_id);
  }

  return users;
});
