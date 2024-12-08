import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import { IGetProductParams } from 'types/entities';
import { UseFormRegister } from 'react-hook-form';

interface MemoizedCheckboxProps {
  value: string;
  name: string;
  register: UseFormRegister<IGetProductParams>;
  isChecked?: boolean;
}

export const MemoizedCheckbox: React.FC<MemoizedCheckboxProps> = React.memo(
  ({ value, name, register, isChecked }: MemoizedCheckboxProps) => {
    return (
      <Checkbox
        value={value}
        isChecked={isChecked}
        {...register(name as keyof IGetProductParams)}
      >
        {value}
      </Checkbox>
    );
  }
);
