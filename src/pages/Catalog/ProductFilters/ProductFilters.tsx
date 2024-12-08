import React from 'react';
import { ListChildComponentProps, FixedSizeList as List } from 'react-window';
import { UseFormRegister } from 'react-hook-form';
import { Checkbox } from '@chakra-ui/react';
import { FilterMenu } from 'common/components';
import { IGetProductParams } from 'types/entities';

import { PropertiesMap } from '../Catalog.helpers';

interface ProductFiltersProps {
  properties: PropertiesMap;
  register: UseFormRegister<IGetProductParams>;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  properties,
  register,
}) => {
  if (!properties || Object.keys(properties).length === 0) return null;

  const renderDynamicCheckbox =
    (data: { id: string; value: string }[]) =>
    ({ index, style }: ListChildComponentProps) => {
      const item = data[index];
      return (
        <div style={style} key={item.id}>
          <Checkbox value={item.value} {...register('properties')}>
            {item.value}
          </Checkbox>
        </div>
      );
    };

  return (
    <>
      {Object.keys(properties).map((item) => (
        <FilterMenu label={item} key={item}>
          <List
            height={250}
            itemCount={properties[item].length || 0}
            itemSize={35}
            width='100%'
          >
            {renderDynamicCheckbox(properties[item])}
          </List>
        </FilterMenu>
      ))}
    </>
  );
};
