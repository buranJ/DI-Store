import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { FormData } from '../CompletePurchase';

interface AdditionalInfoSectionProps {
  register: UseFormRegister<FormData>;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  register,
}) => (
  <Box w={{ base: '100%', lg: '33.33%' }}>
    <HStack align='center' mb={4}>
      <Box className='w-[42px] h-[42px] rounded-full border-2 border-mainColor flex items-center justify-center text-mainColor font-bold'>
        3
      </Box>
      <Heading fontWeight={500} as='h3' size='md'>
        Дополнительно
      </Heading>
    </HStack>
    <VStack>
      <FormControl id='comment'>
        <FormLabel>Примечание</FormLabel>
        <Input
          _focusVisible={{ border: '1px solid #EDF1F3' }}
          type='text'
          placeholder='Необязательно'
          {...register('comment')}
        />
      </FormControl>

      <FormControl id='promo_code'>
        <FormLabel>Промокод</FormLabel>
        <Input
          _focusVisible={{ border: '1px solid #EDF1F3' }}
          type='text'
          placeholder='Введите код'
          {...register('promo_code')}
        />
      </FormControl>
    </VStack>
  </Box>
);

export default AdditionalInfoSection;
