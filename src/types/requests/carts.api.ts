import {
  IAddToCartParams,
  ICart,
  IRemoveFromCartParams,
  IUpdateCartParams,
} from 'types/entities';

export module IGetCarts {
  export type Response = ICart;
  export type Params = void;
}

export module IAddToCart {
  export type Response = ICart;
  export type Params = IAddToCartParams;
}

export module IRemoveFromCart {
  export type Response = ICart;
  export type Params = IRemoveFromCartParams;
}

export module IUpdateCart {
  export type Response = ICart;
  export type Params = IUpdateCartParams;
}

export module IClearCart {
  export type Response = ICart;
  export type Params = void;
}
