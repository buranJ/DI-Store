import { userApi } from './users.api';

export const users = {
  middlewares: [userApi.middleware],
  reducers: {
    [userApi.reducerPath]: userApi.reducer,
  },
  slices: {},
};
