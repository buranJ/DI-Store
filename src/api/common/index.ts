import { brandsApi } from './brands.api';
import { categoriesApi } from './categories.api';
import { productsApi } from './products.api';
import { udsApi } from './uds.api';
import { helpApi } from './help.api';

export const common = {
  middlewares: [
    categoriesApi.middleware,
    productsApi.middleware,
    brandsApi.middleware,
    udsApi.middleware,
    helpApi.middleware,
  ],
  reducers: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [udsApi.reducerPath]: udsApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
  },
  slices: {},
};
