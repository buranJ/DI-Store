import React from 'react';
import { IGetProductParams } from 'types/entities';
import { Checkbox } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { Property } from '../Catalog.helpers';

interface RenderDynamicCheckboxProps {
  index: number;
  style?: React.CSSProperties;
  data: Property[];
  selectedProperties: string;
  register: UseFormRegister<IGetProductParams>;
}

export const RenderDynamicCheckbox: React.FC<RenderDynamicCheckboxProps> = ({
  index,
  style,
  data,
  selectedProperties,
  register,
}) => {
  const item = data[index];
  return item ? (
    <div style={style}>
      <Checkbox
        key={item.id}
        {...register('properties')}
        value={item.value}
        isChecked={selectedProperties.includes(item.value as string)}
      >
        <span className='text-lg color-darkGray text-nowrap whitespace-nowrap'>
          {item.value}
        </span>
      </Checkbox>
    </div>
  ) : null;
};
