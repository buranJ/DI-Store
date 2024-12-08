export type IOrdering = 'price' | 'created_at' | '-price' | '';

// Интерфейс для свойства
interface IProperty {
  id: string;
  name: string;
  value?: string;
}

// Интерфейс для категории
interface ICategory {
  id: string;
  name: string;
  properties: Array<{
    name: string;
    values: Array<{ value: string }>;
  }>;
}

// Интерфейс для бренда
interface IBrand {
  id: string;
  name: string;
  image_url?: string;
}

// Интерфейс для изображения продукта
export interface IProductImage {
  id: string;
  url?: string;
}

// Интерфейс для вариации продукта
interface IVariation {
  id: string;
  price: number;
  quantity: number;
  properties: IProperty[];
}

// Интерфейс для продукта
export interface IProduct {
  id: string;
  title: string;
  description: string;
  brand: IBrand;
  category: ICategory;
  images: IProductImage[];
  variations: IVariation[];
}

export interface IPagination {
  total_items: number;
  page_size: number;
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface IProducts {
  items: IProduct[];
  pagination: IPagination;
}

export interface IGetProductParams {
  search?: string;
  brandName?: string;
  categoryName?: string;
  priceMin?: number;
  priceMax?: number;
  properties?: string;
  order_by?: IOrdering;
  page?: number;
  page_size?: number;
}
