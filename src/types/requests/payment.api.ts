import { IPaymentParams, IPaymentResponse } from 'types/entities';

export module IGetSignature {
  export type Response = IPaymentResponse;
  export type Params = IPaymentParams;
}
