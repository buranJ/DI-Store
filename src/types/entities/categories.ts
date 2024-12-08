interface PropertyValue {
  value: string;
}

export interface Property {
  name: string;
  values: PropertyValue[];
}

export interface Category {
  id: number;
  name: string;
  properties: Property[];
}

export interface ICategoryData {
  id: number;
  name: string;
  categories: Category[];
}

export interface IGetCategoryById {
  category_id: string;
}
