import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';

export const helpApi = createApi({
  reducerPath: 'help',
  baseQuery: getBaseQuery(),
  endpoints: ({ mutation }) => ({
    getHelp: mutation<string, { phone: string; email: string }>({
      query: (body) => ({
        url: 'help-form',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetHelpMutation } = helpApi;
