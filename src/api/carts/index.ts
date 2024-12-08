import { cartsApi } from './carts.api';
import {cartSlice} from './carts.slice';

export const carts = {
  middlewares: [cartsApi.middleware],
  reducers: {
    [cartsApi.reducerPath]: cartsApi.reducer,
  },
  slices: {
    cart: cartSlice.reducer,
  },
};
