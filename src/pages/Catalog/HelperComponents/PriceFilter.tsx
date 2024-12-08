import { FC, memo } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Stack,
  StackDivider,
  FormControl,
  NumberInput,
  NumberInputField,
  Button,
} from '@chakra-ui/react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface IPriceFilterProps {
  control: Control;
  errors: FieldErrors;
}

const PriceFilter: FC<IPriceFilterProps> = ({ control, errors }) => (
  <Menu>
    <MenuButton
      as={Button}
      bg='mainColor'
      color='white'
      _hover={{ bg: 'mainColor' }}
      _active={{ bg: 'mainColor' }}
      borderRadius={10}
    >
      Цена
    </MenuButton>
    <MenuList maxW='150px' boxShadow={'0px 0px 10px 0px #0000001A'}>
      <Stack divider={<StackDivider borderColor='#D9D9D9' />}>
        <FormControl px='10px' isInvalid={!!errors.priceMin}>
          <Controller
            name='priceMin'
            control={control}
            render={({ field }) => (
              <NumberInput
                min={0}
                clampValueOnBlur={false}
                {...field}
                display='flex'
                alignItems='center'
                gap={4}
              >
                От <NumberInputField placeholder='От' />
              </NumberInput>
            )}
          />
        </FormControl>
        <FormControl px='10px' isInvalid={!!errors.priceMax}>
          <Controller
            name='priceMax'
            control={control}
            render={({ field }) => (
              <NumberInput
                min={0}
                clampValueOnBlur={false}
                {...field}
                display='flex'
                alignItems='center'
                gap={4}
              >
                До <NumberInputField placeholder='До' />
              </NumberInput>
            )}
          />
        </FormControl>
      </Stack>
    </MenuList>
  </Menu>
);

const MemoizedPriceFilter = memo(PriceFilter);

export default MemoizedPriceFilter;
