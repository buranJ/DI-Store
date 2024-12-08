import {
  Category,
  ICategoryData,
  IGetProductParams,
  IOrdering,
} from 'types/entities';

export type Property = { id: string; value: string };
export type PropertiesMap = { [key: string]: Property[] };

export const cleanFilters = (filters: IGetProductParams) => {
  const cleanedFilters = { ...filters };

  Object.keys(cleanedFilters).forEach((key) => {
    const value = cleanedFilters[key as keyof IGetProductParams];
    if (
      !value ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'string' && value.length === 0)
    ) {
      delete cleanedFilters[key as keyof IGetProductParams];
    }
  });
  return cleanedFilters;
};

export const categoryMapper = (
  item: ICategoryData
): Omit<Category, 'properties'>[] => {
  return item.categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));
};

export const sortByOptions: { label: string; value: IOrdering }[] = [
  {
    label: 'Исходная сортировка',
    value: '',
  },
  {
    label: 'По новизне',
    value: 'created_at',
  },
  {
    label: 'Цена: по возрастанию',
    value: 'price',
  },
  {
    label: 'Цена: по убыванию',
    value: '-price',
  },
];

export const uniqueAttributes = (
  data: PropertiesMap[] | undefined
): PropertiesMap => {
  const result: PropertiesMap = {};

  if (!data) return result;

  data.forEach((item) => {
    for (const key in item) {
      if (!result[key]) {
        result[key] = [];
      }

      item[key].forEach((attr) => {
        // Проверяем, есть ли уже значение в массиве
        if (!result[key].some((existing) => existing.value === attr.value)) {
          result[key].push(attr);
        }
      });
    }
  });

  return result;
};
