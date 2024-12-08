import { createSlice } from '@reduxjs/toolkit';
import { cartsApi } from './carts.api';
import { ICart } from 'types/entities';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: null as null | ICart,
    isLoading: false,
    cartCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cartsApi.endpoints.getCarts.matchFulfilled,
        (state, { payload }) => {
          state.data = payload;
          state.cartCount = payload.products.reduce((acc, item) => acc + item.quantity, 0);
        }
      )
      .addMatcher(
        cartsApi.endpoints.addToCart.matchFulfilled,
        (state, { payload }) => {
          state.data = payload;
          state.cartCount = payload.products.reduce((acc, item) => acc + item.quantity, 0);
        }
      )
      .addMatcher(
        cartsApi.endpoints.removeFromCart.matchFulfilled,
        (state, { payload }) => {
          state.data = payload;
          state.cartCount = payload.products.reduce((acc, item) => acc + item.quantity, 0);
        }
      )
      .addMatcher(
        cartsApi.endpoints.updateCart.matchFulfilled,
        (state, { payload }) => {
          state.data = payload;
          state.cartCount = payload.products.reduce((acc, item) => acc + item.quantity, 0);
        }
      )
      .addMatcher(
        cartsApi.endpoints.clearCart.matchFulfilled,
        (state, { payload }) => {
          state.data = payload;
          state.cartCount = 0;
        }
      );
  },
});

export const { reducer: cartReducer } = cartSlice;
