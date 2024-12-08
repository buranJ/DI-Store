import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import {
  IAddToCart,
  IClearCart,
  IGetCarts,
  IRemoveFromCart,
  IUpdateCart,
} from 'types/requests';

export const cartsApi = createApi({
  reducerPath: 'carts',
  baseQuery: getBaseQuery(),
  endpoints: ({ query }) => ({
    getCarts: query<IGetCarts.Response, IGetCarts.Params>({
      query: () => ({
        url: 'carts',
        method: 'GET',
      }),
    }),
    addToCart: query<IAddToCart.Response, IAddToCart.Params>({
      query: (body) => ({
        url: 'carts/add_product',
        method: 'POST',
        body,
      }),
    }),
    removeFromCart: query<IRemoveFromCart.Response, IRemoveFromCart.Params>({
      query: (body) => ({
        url: 'carts/remove_product',
        method: 'POST',
        body,
      }),
    }),
    updateCart: query<IUpdateCart.Response, IUpdateCart.Params>({
      query: (body) => ({
        url: `carts/update_quantity`,
        method: 'POST',
        body,
      }),
    }),
    clearCart: query<IClearCart.Response, IClearCart.Params>({
      query: () => ({
        url: 'carts/clear',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetCartsQuery,
  useLazyAddToCartQuery,
  useLazyClearCartQuery,
  useLazyRemoveFromCartQuery,
  useLazyUpdateCartQuery,
  useLazyGetCartsQuery,
} = cartsApi;
