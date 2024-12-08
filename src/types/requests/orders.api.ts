import {
  ICartProduct,
  ICreateOrderParams,
  IGetOrderParams,
  IOrder,
  IOrderDeliveryParams,
} from 'types/entities';

export module IGetOrders {
  export type Response = IOrder[];
  export type Params = void;
}

export module IGetOrder {
  export type Response = IOrder;
  export type Params = IGetOrderParams;
}

export module ICreateOrder {
  export type Response = IOrder;
  export type Params = ICreateOrderParams;
}

export module IOrderSetOrderDelivery {
  export type Response = string;
  export type Params = IOrderDeliveryParams;
}

export module IOrderProducts {
  export type Response = ICartProduct[];
  export type Params = void;
}
