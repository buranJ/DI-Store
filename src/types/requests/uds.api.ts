import { IUdsParams, IUds, IOrderUdsDiscountParams, ICart } from 'types/entities';

export module IGetUds {
  export type Params = IUdsParams;
  export type Response = IUds;
}

export module IPostUds {
  export type Params = IOrderUdsDiscountParams;
  export type Response = ICart;
}
