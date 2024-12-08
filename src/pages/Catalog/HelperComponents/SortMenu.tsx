import { FC } from 'react';
import {
  Flex,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  FormControl,
  Stack,
  StackDivider,
  Box,
  MenuItem,
} from '@chakra-ui/react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import UpDownArrow from 'assets/icons/arrow-down-up.svg?react';
import Settings from 'assets/icons/settings.svg?react';
import ArrowRight from 'assets/icons/arrow-forward.svg?react';
import { sortByOptions } from '../Catalog.helpers';
import { IGetProductParams } from 'types/entities';

interface IProps {
  onOpenFilter: () => void;
  control: Control;
  setValue: UseFormSetValue<IGetProductParams>;
  onClose: () => void;
}

export const SortMenu: FC<IProps> = ({
  onOpenFilter,
  control,
  setValue,
  onClose,
}) => (
  <Flex mt={2.5} justify='space-between' alignItems='center' mb={26}>
    <Icon
      w={{ base: '30px', lg: '50px' }}
      h={{ base: '30px', lg: '50px' }}
      as={Settings}
      onClick={onOpenFilter}
    />
    <Menu placement='bottom-end'>
      <MenuButton>
        <Icon
          w={{ base: '30px', lg: '50px' }}
          h={{ base: '30px', lg: '50px' }}
          as={UpDownArrow}
        />
      </MenuButton>
      <MenuList>
        <FormControl>
          <Stack divider={<StackDivider borderColor='#D9D9D9' margin={0} />}>
            {sortByOptions.map((item) => (
              <Controller
                key={item.value}
                name='order_by'
                control={control}
                render={({ field }) => (
                  <MenuItem
                    {...field}
                    value={item.value}
                    bg={field.value === item.value ? 'mainColor' : 'white'}
                    color={field.value === item.value ? 'white' : '#B1B1B1'}
                    onClick={() => {
                      setValue('order_by', item.value);
                      onClose();
                    }}
                  >
                    <Text>{item.label}</Text>
                    <Box
                      as={ArrowRight}
                      ml='auto'
                      stroke={field.value === item.value ? 'white' : '#B1B1B1'}
                    />
                  </MenuItem>
                )}
              />
            ))}
          </Stack>
        </FormControl>
      </MenuList>
    </Menu>
  </Flex>
);
