import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { IGetSignature } from 'types/requests';

export interface IInitPaymentParams {
  pg_order_id: string;
  pg_merchant_id: string;
  pg_amount: number;
  pg_description: string;
  pg_salt: string;
  pg_sig: string;
}

export interface IPaymentStatusParams {
  pg_order_id: string;
  pg_merchant_id: string;
  pg_salt: string;
  pg_sig: string;
}

export interface IInitPaymentResponse {
  payment_url: string;
}

export interface IPaymentStatusResponse {
  status: string;
}

export const paymentApi = createApi({
  reducerPath: 'payment',
  baseQuery: getBaseQuery(),
  endpoints: ({ query }) => ({
    generateSignature: query<IGetSignature.Response, IGetSignature.Params>({
      query: (params) => ({
        url: 'payments/generate_signature',
        params,
      }),
    }),
  }),
});

export const { useLazyGenerateSignatureQuery } = paymentApi;
