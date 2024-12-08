import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetCategories, IGetCategory } from 'types/requests';

export const categoriesApi = createApi({
  reducerPath: 'categories',
  baseQuery: getBaseQuery(),
  endpoints: ({ query }) => ({
    getCategories: query<IGetCategories.Response, IGetCategories.Params>({
      query: () => ({
        url: 'categories',
        method: 'GET',
      }),
    }),
    getCategory: query<IGetCategories.Response, IGetCategory.Params>({
      query: ({ category_id }) => ({
        url: `categories/${category_id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
