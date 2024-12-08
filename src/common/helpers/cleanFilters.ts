import { IGetProductParams } from 'types/entities';

export const cleanFilters = (filters: IGetProductParams) => {
  const cleanedFilters = { ...filters };

  Object.keys(cleanedFilters).forEach((key) => {
    const value = cleanedFilters[key as keyof IGetProductParams];
    if (
      !value ||
      value === 'false' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete cleanedFilters[key as keyof IGetProductParams];
    }
  });
  return cleanedFilters;
};
