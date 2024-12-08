export interface IUds {
  uid: string;
  points: number;
}

export interface IUdsParams {
  uds_code: string;
}

export interface IOrderUdsDiscountParams {
  order_id: number;
  uds_code: string;
  points: number;
}
