export interface IPaymentParams {
  pg_order_id: number;
  pg_amount: number;
  pg_description: string;
  pg_merchant_id: string;
  pg_salt: string;
  pg_currency: string;
  pg_success_url: string;
  pg_fail_url: string;
  pg_delivery: string;
}

export interface IPaymentResponse {
  signature: string;
  params: IPaymentParams;
}
