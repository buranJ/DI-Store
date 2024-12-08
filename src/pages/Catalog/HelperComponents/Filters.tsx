import React, { memo } from 'react';
import { Flex, Checkbox } from '@chakra-ui/react';
import { FilterMenu } from 'common/components';
import PriceFilter from './PriceFilter';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFormContext,
} from 'react-hook-form';
import { useGetCategoriesQuery } from 'api/common/categories.api';
import { useGetBrandsQuery } from 'api/common/brands.api';
import { categoryMapper } from '../Catalog.helpers';
import { FixedSizeList as List } from 'react-window';
import { IGetProductParams } from 'types/entities';

interface IProps {
  register: UseFormRegister<IGetProductParams>;
  errors: FieldErrors<IGetProductParams>;
  control: Control<IGetProductParams>;
}

const Filters: React.FC<IProps> = ({ register, errors, control }) => {
  const { watch } = useFormContext(); // Используем контекст формы
  const categoriesQuery = useGetCategoriesQuery();
  const brandsQuery = useGetBrandsQuery();

  const categories = categoriesQuery.data?.flatMap(categoryMapper);
  const selectedCategories = watch('categoryName') || [];
  const selectedBrands = watch('brandName') || [];

  const renderCheckbox =
    (
      data: { id: number; name: string }[] = [],
      registerName: keyof IGetProductParams,
      selectedValues: string[]
    ) =>
    ({ index, style }: { index: number; style?: React.CSSProperties }) => {
      if (!data) return null;
      const item = data[index];
      return (
        <div style={style}>
          <Checkbox
            key={item.id}
            value={item.name}
            isChecked={selectedValues.includes(item.name)}
            {...register(registerName)}
          >
            <span className='text-lg color-darkGray text-nowrap'>
              {item.name}
            </span>
          </Checkbox>
        </div>
      );
    };

  return (
    <>
      <Flex gap='50px' mb={34}>
        <PriceFilter control={control} errors={errors} />

        {/* Категории */}
        <FilterMenu label='Категория'>
          <List
            height={250}
            itemCount={categories?.length || 0}
            itemSize={35}
            width='350px'
          >
            {renderCheckbox(categories, 'categoryName', selectedCategories)}
          </List>
        </FilterMenu>

        {/* Бренды */}
        <FilterMenu label='Бренд'>
          <List
            height={250}
            itemCount={brandsQuery?.data?.length || 0}
            itemSize={35}
            width='300px'
          >
            {renderCheckbox(brandsQuery.data, 'brandName', selectedBrands)}
          </List>
        </FilterMenu>
      </Flex>
    </>
  );
};

const MemoFilters = memo(Filters);
export { MemoFilters as Filters };
