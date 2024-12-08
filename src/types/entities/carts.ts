export interface ICartProductVariants {
  id: number;
  price: number;
  quantity: number;
  properties: {
    id: number;
    name: string;
    value: string;
  }[];
  product: {
    id: number;
    title: string;
    description: string;
    images: {
      id?: number;
      url?: string;
    }[];
  };
}

export interface ICartProduct {
  id: number;
  quantity: number;
  product_variation: ICartProductVariants;
}

export interface ICart {
  id: number;
  total_price: number;
  products: ICartProduct[];
}

export interface IAddToCartParams {
  variation_id: string;
  quantity: number;
}

export interface IRemoveFromCartParams {
  product_variation_id: number;
}

export interface IUpdateCartParams {
  variation_id: number;
  quantity: number;
}
