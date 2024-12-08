import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useHeader } from 'common/hooks';

import { ResponsiveContainer } from 'common/ui';
import { HeadingPage } from 'common/components';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

import './style.scss';

interface AddressFormData {
  name: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
}

export const Address = () => {
  const headerContext = useHeader();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      country: 'Кыргызстан',
      city: 'Бишкек',
      address: '',
    },
  });

  useEffect(() => {
    headerContext?.handleShowArrow(true);
    headerContext?.handleIconsHide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: AddressFormData) => {
    console.log('Form Submitted:', data);
  };

  return (
    <section className='address h-screen'>
      <ResponsiveContainer>
        <div className='address__top'>
          <HeadingPage>
            <h2 className='font-bold text-[22px] text-center mb-[12px] mt-[26px]'>
              Адрес
            </h2>
          </HeadingPage>
          <h2 className='font-bold text-[22px] text-center mb-[12px] mt-[26px] lg-md:hidden'>
            Адрес
          </h2>
          <p className='text-center text-[18px] leading-tight'>
            Следующие адреса будут использованы по умолчанию при оформлении
            заказов
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='address__content mt-[25px]'>
            <Accordion
              defaultIndex={[0, 1]}
              allowMultiple
              className='lg-md:!flex lg-md:justify-between'
            >
              <AccordionItem border='none' className='lg-md:w-[45%]'>
                <AccordionButton
                  bg='#CCD47C'
                  padding='22px 10px'
                  borderRadius='10px'
                  className='lg-md:!hidden'
                  _hover={{ background: '#CCD47C' }}
                >
                  <Box
                    flex='1'
                    textAlign='left'
                    color='white'
                    fontSize='22px'
                    fontWeight='bold'
                  >
                    Информация о заказчике
                  </Box>
                  <AccordionIcon color='white' width='40px' height='40px' />
                </AccordionButton>
                <Box
                  flex='1'
                  textAlign='center'
                  color='white'
                  fontSize='22px'
                  fontWeight='bold'
                  bg='#CCD47C'
                  padding='22px 10px'
                  borderRadius='10px'
                  className='hidden lg-md:block'
                >
                  Информация о заказчике
                </Box>
                <AccordionPanel pb={4}>
                  <FormControl isInvalid={!!errors.name} mb={4}>
                    <FormLabel>Имя *</FormLabel>
                    <Input
                      placeholder='Имя'
                      {...register('name', { required: 'Имя обязательно' })}
                    />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.phone} mb={4}>
                    <FormLabel>Телефон*</FormLabel>
                    <Input
                      placeholder='Телефон'
                      {...register('phone', {
                        required: 'Поле обязательно для заполнения',
                        pattern: {
                          value: /^(\+996)(\d{9})$/,
                          message:
                            'Введите корректный номер телефона Кыргызстана (+996 XXX XXX XXX)',
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email} mb={4}>
                    <FormLabel>Почта*</FormLabel>
                    <Input
                      placeholder='example@gmail.com'
                      type='email'
                      {...register('email', { required: 'Почта обязательна' })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem
                border='none'
                className='mt-[15px] lg-md:mt-0 lg-md:w-[45%]'
              >
                <AccordionButton
                  bg='#CCD47C'
                  padding='22px 10px'
                  borderRadius='10px'
                  className='lg-md:!hidden'
                  _hover={{ background: '#CCD47C' }}
                >
                  <Box
                    flex='1'
                    textAlign='left'
                    color='white'
                    fontSize='22px'
                    fontWeight='bold'
                  >
                    Адрес доставки
                  </Box>
                  <AccordionIcon color='white' width='40px' height='40px' />
                </AccordionButton>
                <Box
                  flex='1'
                  textAlign='center'
                  color='white'
                  fontSize='22px'
                  fontWeight='bold'
                  bg='#CCD47C'
                  padding='22px 10px'
                  borderRadius='10px'
                  className='hidden lg-md:block'
                >
                  Адрес доставки
                </Box>
                <AccordionPanel pb={4}>
                  <FormControl isInvalid={!!errors.country} mb={4}>
                    <FormLabel>Страна*</FormLabel>
                    <Input
                      placeholder='Кыргызстан'
                      {...register('country', {
                        required: 'Страна обязательна',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.country?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.city} mb={4}>
                    <FormLabel>Город*</FormLabel>
                    <Input
                      placeholder='Бишкек'
                      {...register('city', { required: 'Город обязателен' })}
                    />
                    <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.address} mb={4}>
                    <FormLabel>Адрес*</FormLabel>
                    <Input
                      placeholder='Номер дома и название улицы'
                      {...register('address', { required: 'Адрес обязателен' })}
                    />
                    <FormErrorMessage>
                      {errors.address?.message}
                    </FormErrorMessage>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Box
              display='flex'
              justifyContent={{ base: 'space-between', md: 'center' }}
              gap={{ base: '0', md: '95px' }}
              mt='42px'
              pb='140px'
            >
              <Button
                type='button'
                onClick={() => reset()}
                borderColor='#CCD47C'
                variant='outline'
                color='#CCD47C'
                fontSize='25px'
                width={{ base: '45%', md: '35%' }}
                py='15px'
                _hover={{
                  bg: '#CCD47C',
                  color: 'white',
                  border: '1px solid #CCD47C',
                }}
              >
                Сбросить
              </Button>
              <Button
                type='submit'
                bg='#CCD47C'
                color='white'
                fontSize='25px'
                width={{ base: '45%', md: '35%' }}
                py='15px'
                _hover={{
                  bg: 'white',
                  color: '#CCD47C',
                  border: '1px solid #CCD47C',
                }}
              >
                Сохранить
              </Button>
            </Box>
          </div>
        </form>
      </ResponsiveContainer>
    </section>
  );
};
