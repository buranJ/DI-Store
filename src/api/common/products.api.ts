import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import {
  IGetProducts,
  IGetProduct,
  IGetBestSellers,
  IGetFavorites,
  IRemoveFavorite,
  ISetFavorite,
} from 'types/requests';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    getProducts: query<IGetProducts.Response, IGetProducts.Params>({
      query: ({ page = 1, page_size = 20, ...params } = {}) => ({
        url: 'products',
        method: 'POST',
        params: {
          page,
          page_size,
          ...params,
        },
      }),
    }),
    getProduct: query<IGetProduct.Response, IGetProduct.Params>({
      query: ({ id }) => ({
        url: `products/${id}`,
        method: 'GET',
      }),
    }),
    getBestsellers: query<IGetBestSellers.Response, IGetBestSellers.Params>({
      query: ({ page = 1, page_size = 20 } = {}) => ({
        url: 'products/bestselling',
        method: 'GET',
        params: {
          page,
          page_size,
        },
      }),
    }),
    getNewProducts: query<IGetBestSellers.Response, IGetBestSellers.Params>({
      query: ({ page = 1, page_size = 20 } = {}) => ({
        url: 'products/new',
        method: 'GET',
        params: {
          page,
          page_size,
        },
      }),
    }),
    getFavorites: query<IGetFavorites.Response, IGetFavorites.Params>({
      query: () => ({
        url: 'products/favorites/list',
        method: 'GET',
      }),
    }),
    removeFavorite: mutation<IRemoveFavorite.Response, IRemoveFavorite.Params>({
      query: ({ product_id }) => ({
        url: `products/favorites/unset`,
        method: 'POST',
        body: {
          product_id,
        },
      }),
    }),
    setFavorite: mutation<ISetFavorite.Response, ISetFavorite.Params>({
      query: ({ product_id }) => ({
        url: `products/favorites/set`,
        method: 'POST',
        body: {
          product_id,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductQuery,
  useGetBestsellersQuery,
  useGetNewProductsQuery,
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
  useRemoveFavoriteMutation,
  useSetFavoriteMutation,
} = productsApi;
