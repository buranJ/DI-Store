import { ICartProduct } from './carts';

export interface IOrderProduct extends Pick<ICartProduct, 'product_variation'> {
  quantity: number;
}

export interface IOrder {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  country: string;
  city: string;
  address: string;
  comment: string;
  promo_code: string;
  status: string;
  total_price: number;
  products?: IOrderProduct[];
}

export interface IGetOrderParams {
  order_id: number;
}

export interface ICreateOrderParams
  extends Omit<IOrder, 'id' | 'status' | 'products' | 'total_price'> {}

export interface IOrderDeliveryParams {
  order_id: number;
  delivery: boolean;
}
