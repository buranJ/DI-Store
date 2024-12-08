import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { common } from './common';
import { carts } from './carts';
import { orders } from './orders';
import { users } from './users';
import { auth } from './auth';
import { payment } from './payment';

const rootReducer = combineReducers({
  ...common.reducers,
  ...common.slices,
  ...carts.slices,
  ...carts.reducers,
  ...orders.reducers,
  ...orders.slices,
  ...users.reducers,
  ...users.slices,
  ...auth.reducers,
  ...payment.reducers,
  ...payment.slices,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        ...common.middlewares,
        ...carts.middlewares,
        ...orders.middlewares,
        ...users.middlewares,
        ...auth.middlewares,
        ...payment.middlewares
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
