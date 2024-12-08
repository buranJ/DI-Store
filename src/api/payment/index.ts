import { paymentApi } from './payment.api';

export const payment = {
  middlewares: [paymentApi.middleware],
  reducers: {
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  slices: {},
};
