import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetCurrentUser, IGetUser, IUpdateCurrentUser } from 'types/requests';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: getBaseQuery(),
  endpoints: ({ query }) => ({
    getCurrentUser: query<IGetCurrentUser.Response, IGetCurrentUser.Params>({
      query: () => ({
        url: 'users/me',
        method: 'GET',
      }),
    }),
    updateCurrentUser: query<
      IUpdateCurrentUser.Response,
      IUpdateCurrentUser.Params
    >({
      query: (body) => ({
        url: 'users/me',
        method: 'PATCH',
        body,
      }),
    }),
    getUser: query<IGetUser.Response, IGetUser.Params>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: query<IGetUser.Response, IGetUser.Params>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'PATCH',
      }),
    }),
    deleteUser: query<IGetUser.Response, IGetUser.Params>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLazyUpdateCurrentUserQuery,
  useLazyGetUserQuery,
  useLazyUpdateUserQuery,
  useLazyDeleteUserQuery,
} = userApi;

export default userApi;
