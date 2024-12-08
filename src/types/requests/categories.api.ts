import { IGetCategoryById, ICategoryData } from 'types/entities';

export module IGetCategories {
  export type Response = ICategoryData[];
  export type Params = void;
}

export module IGetCategory {
  export type Response = ICategoryData;
  export type Params = IGetCategoryById;
}
