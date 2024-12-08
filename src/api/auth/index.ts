import { authApi } from './auth.api';

export const auth = {
  middlewares: [authApi.middleware],
  reducers: {
    [authApi.reducerPath]: authApi.reducer,
  },
};
