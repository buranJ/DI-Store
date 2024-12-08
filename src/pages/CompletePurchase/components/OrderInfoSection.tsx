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

interface OrderInfoSectionProps {
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
}

const OrderInfoSection: React.FC<OrderInfoSectionProps> = ({
  errors,
  register,
}) => (
  <Box w={{ base: '100%', lg: '33.33%' }}>
    <HStack align='center' mb={4}>
      <Box className='w-[42px] h-[42px] rounded-full border-2 border-mainColor flex items-center justify-center text-mainColor font-bold'>
        1
      </Box>
      <Heading fontWeight={500} as='h3' size='md'>
        Информации о заказчике
      </Heading>
    </HStack>
    <VStack>
      <FormControl isRequired id='name' isInvalid={!!errors.customer_name}>
        <FormLabel>Имя</FormLabel>
        <Input
          type='text'
          placeholder='Имя'
          _focusVisible={{ border: '1px solid #EDF1F3' }}
          {...register('customer_name', {
            required: 'Имя обязательно',
          })}
        />
        <Text color='red.500'>{errors.customer_name?.message}</Text>
      </FormControl>

      <FormControl isRequired id='phone' isInvalid={!!errors.customer_phone}>
        <FormLabel>Телефон</FormLabel>
        <Input
          _focusVisible={{ border: '1px solid #EDF1F3' }}
          type='text'
          placeholder='Телефон'
          {...register('customer_phone', {
            required: 'Поле обязательно для заполнения',
            pattern: {
              value: /^(\+996)(\d{9})$/,
              message:
                'Введите корректный номер телефона Кыргызстана (+996 XXX XXX XXX)',
            },
          })}
        />
        <Text color='red.500'>{errors.customer_phone?.message}</Text>
      </FormControl>

      <FormControl isRequired id='email' isInvalid={!!errors.customer_email}>
        <FormLabel>Почта</FormLabel>
        <Input
          _focusVisible={{ border: '1px solid #EDF1F3' }}
          type='email'
          placeholder='example@gmail.com'
          {...register('customer_email', {
            required: 'Почта обязательна',
          })}
        />
        <Text color='red.500'>{errors.customer_email?.message}</Text>
      </FormControl>
    </VStack>
  </Box>
);

export default OrderInfoSection;
