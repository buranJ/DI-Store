import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetUds, IPostUds } from 'types/requests';

export const udsApi = createApi({
  reducerPath: 'uds',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    getUds: query<IGetUds.Response, IGetUds.Params>({
      query: ({ uds_code }) => ({
        url: 'uds/points',
        params: { uds_code },
      }),
    }),
    setUdsDiscount: mutation<IPostUds.Response, IPostUds.Params>({
      query: (body) => ({
        url: 'orders/set_uds_discount/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLazyGetUdsQuery, useSetUdsDiscountMutation } = udsApi;
