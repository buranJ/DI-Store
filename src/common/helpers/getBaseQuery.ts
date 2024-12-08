import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

/**
 * This is for fetchBaseQuery
 * @returns function
 */

// 202 - success => string. only in reset:forgot password
// 400 - bad request => {detail: string} | detail: {code: string; reason: string}
// 401 - unauthorized | Missing token or inactive user. => string
// 403 - Not a superuser. => string
// 404 - The user does not exist. => string
// 422 - validation error => {detail: ValidationError[]}

export const getBaseQuery =
  (): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const fetchQuery = fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      credentials: 'same-origin',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('access_token');

        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Accept', 'application/json');
        return headers;
      },
    });
    const result = await fetchQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      window.location.href = '/auth';
    }

    return result;
  };
