import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetBrands } from 'types/requests';

export const brandsApi = createApi({
  reducerPath: 'brands',
  baseQuery: getBaseQuery(),
  endpoints: ({ query }) => ({
    getBrands: query<IGetBrands.Response, IGetBrands.Params>({
      query: () => ({
        url: 'brands',
      }),
    }),
    getRandomBrands: query<IGetBrands.Response, { count: number }>({
      query: ({ count }) => ({
        url: 'brands/random_list',
        params: {
          count,
        },
      }),
    }),
  }),
});

export const { useGetBrandsQuery, useGetRandomBrandsQuery } = brandsApi;
