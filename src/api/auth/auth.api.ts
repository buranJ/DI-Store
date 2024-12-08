import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IAuthLogin, IAuthRegister } from 'types/requests';
import {
  IAuthForgotPassword,
  IAuthLogout,
  IAuthResetPassword,
} from 'types/requests/auth.api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: getBaseQuery(),
  endpoints: (build) => ({
    login: build.mutation<IAuthLogin.IResponse, IAuthLogin.IParams>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: IAuthLogin.IResponse) => {
        localStorage.setItem('access_token', response.access_token);
        return response;
      },
    }),
    register: build.mutation<IAuthRegister.Response, IAuthRegister.IParams>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    logout: build.mutation<IAuthLogout.Response, IAuthLogout.Params>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    forgotPassword: build.mutation<
      IAuthForgotPassword.Response,
      IAuthForgotPassword.Params
    >({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: build.mutation<
      IAuthResetPassword.Response,
      IAuthResetPassword.Params
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { login, register } = authApi.endpoints;
export const {
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
