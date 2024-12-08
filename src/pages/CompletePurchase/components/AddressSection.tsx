import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormData } from '../CompletePurchase';

interface AddressSectionProps {
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  errors,
  register,
}) => (
  <Box w={{ base: '100%', lg: '33.33%' }}>
    <HStack align='center' mb={4}>
      <Box className='w-[42px] h-[42px] rounded-full border-2 border-mainColor flex items-center justify-center text-mainColor font-bold'>
        2
      </Box>
      <Heading fontWeight={500} as='h3' size='md'>
        Адрес
      </Heading>
    </HStack>
    <VStack>
      <FormControl isRequired id='country'>
        <FormLabel>Страна</FormLabel>
        <Input
          _focusVisible={{ border: '1px solid #EDF1F3' }}
          type='text'
          placeholder='Кыргызстан'
          {...register('country', { required: true })}
          defaultValue='Кыргызстан'
        />
      </FormControl>

      <FormControl isRequired id='city'>
        <FormLabel>Город</FormLabel>
        <Input
          _focusVisible={{ border: '1px solid #EDF1F3' }}
          type='text'
          placeholder='Бишкек'
          {...register('city', { required: true })}
          defaultValue='Бишкек'
        />
      </FormControl>

      <FormControl isRequired id='address' isInvalid={!!errors.address}>
        <FormLabel>Адрес</FormLabel>
        <Input
          _focusVisible={{ border: '1px solid #EDF1F3' }}
          type='text'
          placeholder='Номер дома и название улицы'
          {...register('address', { required: 'Адрес обязателен' })}
        />
        <Text color='red.500'>{errors.address?.message}</Text>
      </FormControl>
    </VStack>
  </Box>
);

export default AddressSection;
