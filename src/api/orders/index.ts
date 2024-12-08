import { ordersApi } from './orders.api';

export const orders = {
  middlewares: [ordersApi.middleware],
  reducers: {
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  slices: {},
};
