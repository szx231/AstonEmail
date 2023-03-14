import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDecodeUrlUserEmail } from '../../helpers/GetDecodeUrlUserEmail';
import { timeAgo } from '../../helpers/TimeAgoDate';
import { EmailCardType, ResponseUsers } from './typed';

export const emailsApi = createApi({
  reducerPath: 'emailsApi',
  tagTypes: ['FavoriteList'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getAllEmails: builder.query<EmailCardType[], { category: string; querySearch: string }>({
      query: (args) => `emails?category=${args.category}&search=${args.querySearch || ''}`,
    }),
    getEmail: builder.query<EmailCardType, string>({
      query: (email) => `email?user=${email || getDecodeUrlUserEmail()}`,
    }),
    getFavoriteList: builder.query<EmailCardType[], void>({
      query: () => `/getFavorite`,
      providesTags: ['FavoriteList'],
    }),
    getUsersInfo: builder.query<ResponseUsers[], void>({
      query: () => `/getUsersInfo`,
      transformResponse: (response: ResponseUsers[]) => {
        return response.map((el: ResponseUsers) => ({ ...el, created_on: timeAgo(el.created_on) }));
      },
    }),
    addMessageToFavorite: builder.mutation({
      query: (body) => ({
        url: 'addFavorite',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FavoriteList'],
    }),
  }),
});

export const {
  useGetAllEmailsQuery,
  useLazyGetAllEmailsQuery,
  useGetEmailQuery,
  useAddMessageToFavoriteMutation,
  useGetFavoriteListQuery,
  useLazyGetFavoriteListQuery,
  useLazyGetUsersInfoQuery,
} = emailsApi;
