import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import {
  ICreateOrder,
  IGetOrder,
  IGetOrders,
  IOrderSetOrderDelivery,
  IOrderProducts,
} from 'types/requests';

export const ordersApi = createApi({
  reducerPath: 'orders',
  baseQuery: getBaseQuery(),
  endpoints: ({ query, mutation }) => ({
    getOrders: query<IGetOrders.Response, IGetOrders.Params>({
      query: () => ({
        url: 'orders',
        method: 'GET',
      }),
    }),
    getOrderById: query<IGetOrder.Response, IGetOrder.Params>({
      query: ({ order_id }) => ({
        url: `orders/${order_id}`,
        method: 'GET',
      }),
    }),
    createOrder: query<ICreateOrder.Response, ICreateOrder.Params>({
      query: (body) => ({
        url: 'orders/create_from_cart',
        method: 'POST',
        body,
      }),
    }),
    setOrderDelivery: mutation<
      IOrderSetOrderDelivery.Response,
      IOrderSetOrderDelivery.Params
    >({
      query: ({ order_id, delivery = false }) => ({
        url: 'orders/set_delivery/',
        method: 'POST',
        body: {
          order_id,
          delivery,
        },
      }),
    }),
    getOrderProducts: query<IOrderProducts.Response, IOrderProducts.Params>({
      query: () => ({
        url: `orders/order_products`,
        method: 'GET',
      }),
    }),
    deleteOrder: query<number, { order_id: number }>({
      query: ({ order_id }) => ({
        url: `orders/delete/${order_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useLazyCreateOrderQuery,
  useSetOrderDeliveryMutation,
  useLazyGetOrderByIdQuery,
  useGetOrderProductsQuery,
  useLazyDeleteOrderQuery,
} = ordersApi;
