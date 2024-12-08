import { FormControl, Checkbox, Stack, Text } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormData } from '../CompletePurchase';

interface PrivacyPolicySectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({
  register,
  errors,
}) => (
  <Stack direction='column' spacing={3}>
    <span className='text-[13px]'>
      Ваши персональные данные будут использоваться для обработки вашего заказа,
      поддержки вашего использования на этом веб-сайте и для других целей,
      описанных в нашем{' '}
      <a
        className='text-mainColor underline underline-offset-2 text-[13px]'
        href=''
      >
        политика конфиденциальности
      </a>
    </span>
    <FormControl isRequired id='acceptTerms' isInvalid={!!errors.acceptTerms}>
      <Checkbox
        {...register('acceptTerms', {
          required: 'Вы должны принять правила и условия',
        })}
      >
        <span className='text-sm'>
          Я прочитал(а) и принимаю{' '}
          <a
            className='text-mainColor underline underline-offset-2 text-[13px]'
            href=''
          >
            правила и условия
          </a>{' '}
          сайта
        </span>
      </Checkbox>
      <Text color='red.500'>{errors.acceptTerms?.message}</Text>
    </FormControl>
  </Stack>
);

export default PrivacyPolicySection;
