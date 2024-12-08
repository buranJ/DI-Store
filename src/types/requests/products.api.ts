import { IGetProductParams, IProduct, IProducts } from 'types/entities';

export module IGetProducts {
  export type Response = IProducts;
  export type Params = IGetProductParams;
}

export module IGetProduct {
  export type Response = IProduct;
  export type Params = {
    id: string;
  };
}

export module IGetBestSellers {
  export type Response = IProducts;
  export type Params = Pick<IGetProductParams, 'page_size' | 'page'>;
}

export module IGetFavorites {
  export type Response = IProducts;
  export type Params = Pick<IGetProductParams, 'page_size' | 'page'>;
}

export module ISetFavorite {
  export type Response = IProduct;
  export type Params = {
    product_id: string;
  };
}

export module IRemoveFavorite {
  export type Response = IProduct;
  export type Params = {
    product_id: string;
  };
}
