import { useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  FormErrorMessage,
  FormControl,
  useDisclosure,
  Button,
  Avatar,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

import { HeadingPage } from 'common/components';

import {
  useGetCurrentUserQuery,
  useLazyUpdateCurrentUserQuery,
} from 'api/users/users.api';

import { IUpdateUserParams } from 'types/entities';

import bg from 'assets/images/Auth/auth-bg.png';
import Eye from 'assets/icons/eye.svg?react';
import EyeOff from 'assets/icons/eye-gray.svg?react';

import MyAccModal from './MyAccModal';

import './index.scss';
import 'react-phone-input-2/lib/style.css';

export const MyAcc = () => {
  const { data } = useGetCurrentUserQuery();
  const [updateUser, { isLoading }] = useLazyUpdateCurrentUserQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = useState(false);
  const [newPassword, setNewPassword] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IUpdateUserParams>({ defaultValues: {} });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  useEffect(() => {
    if (newPassword) {
      setValue('password', newPassword);
    }
  }, [newPassword, setValue]);

  const onSubmit = (values: IUpdateUserParams) => {
    const { password, ...rest } = values;

    const updateData = password ? { ...rest, password } : rest;

    updateUser(updateData);
  };

  return (
    <section className='my-acc'>
      <MyAccModal
        isOpen={isOpen}
        onClose={onClose}
        setNewPassword={setNewPassword}
      />
      <div className='my-acc__img'>
        <img src={bg} alt='' />
      </div>
      <div className='my-acc__content'>
        <div className='my-acc__form'>
          <div className='my-acc__form--top'>
            <HeadingPage>
              <h2>Мой аккаунт</h2>
            </HeadingPage>
            <h2 className='block lg-md:hidden'>Мой аккаунт</h2>
            <div className='flex flex-col items-center'>
              <div className='avatar'>
                <Avatar
                  bg='teal.500'
                  className='w-[72px] h-[72px] rounded-full'
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2'>
              <label>
                <span>Имя</span>
                <FormControl>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type='text'
                      borderRadius='16px'
                      _focusVisible={{ boxShadow: 'none' }}
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.name && <span>{errors.name?.message}</span>}
                  </FormErrorMessage>
                </FormControl>
              </label>
            </div>
            <div className='mt-2'>
              <label>
                <span>Nickname</span>
                <FormControl isInvalid={!!errors.nickname}>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type='text'
                      borderRadius='16px'
                      _focusVisible={{ boxShadow: 'none' }}
                      {...register('nickname', {
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.nickname && <span>{errors.nickname?.message}</span>}
                  </FormErrorMessage>
                </FormControl>
              </label>
            </div>
            <div className='mt-2'>
              <label>
                <span>Email</span>
                <FormControl isInvalid={!!errors.email}>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type='text'
                      borderRadius='16px'
                      _focusVisible={{ boxShadow: 'none' }}
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения',
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Некорректный email',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email && <span>{errors.email?.message}</span>}
                  </FormErrorMessage>
                </FormControl>
              </label>
            </div>
            <div className='mt-2'>
              <label>
                <span>Номер телефона</span>
                <InputGroup size='md' zIndex={2}>
                  <Controller
                    name='phone_number'
                    control={control}
                    rules={{
                      required: 'Поле обязательно для заполнения',
                      minLength: {
                        value: 10,
                        message: 'Введите корректный номер телефона',
                      },
                    }}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country={'kg'}
                        inputStyle={{
                          width: '100%',
                          height: '48px',
                          borderRadius: '10px',
                          paddingLeft: '60px',
                          border: '1px solid #E2E8F0',
                        }}
                        buttonStyle={{
                          borderRadius: '10px 0 0 10px',
                          border: '1px solid #E2E8F0',
                        }}
                        buttonClass='phone-input__button'
                      />
                    )}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.phone_number && (
                    <span>{errors.phone_number?.message}</span>
                  )}
                </FormErrorMessage>
              </label>
            </div>
            <div className='mt-2'>
              <label>
                <span>Пароль</span>
                <FormControl isInvalid={!!errors.password} zIndex='1'>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      borderRadius='16px'
                      _focusVisible={{ boxShadow: 'none' }}
                      {...register('password', {
                        minLength: {
                          value: 8,
                          message: 'Password must have at least 8 characters',
                        },
                      })}
                    />
                    <InputRightElement width='3rem' borderRadius='16px'>
                      <Icon
                        as={show ? Eye : EyeOff}
                        onClick={() => setShow(!show)}
                        cursor='pointer'
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && <span>{errors.password?.message}</span>}
                  </FormErrorMessage>
                </FormControl>
              </label>
            </div>
            <div onClick={onOpen} className='my-acc__forms-bottom mt-2'>
              <span>Забыли пароль?</span>
            </div>
            <Button type='submit' isLoading={isLoading}>
              Сохранить изменения
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
