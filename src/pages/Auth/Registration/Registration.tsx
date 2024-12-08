import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

import { useRegisterMutation } from 'api/auth/auth.api';

import { useToastNotification } from 'common/hooks';
import { IRegisterUserParams } from 'types/entities';

import Eye from 'assets/icons/eye.svg?react';
import EyeOff from 'assets/icons/eye-gray.svg?react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import './styles.scss';

interface IRegistrationProps {
  setView: (value: 'login' | 'registration' | 'forgotPassword') => void;
}

const Registration: FC<IRegistrationProps> = ({ setView }) => {
  const [registerUser, { error, isSuccess, data }] = useRegisterMutation();
  const navigate = useNavigate();
  const notify = useToastNotification();
  const [show, setShow] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUserParams>();

  useEffect(() => {
    if (isSuccess) {
      notify.onCreated({ title: 'Вы успешно зарегистрировались' });
      localStorage.setItem('access_token', data.access_token);
      navigate('/');
    }

    if (error) {
      notify.onError({
        description: 'Неверное имя пользователя или пароль',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess, data]);

  const onSubmit = async (values: IRegisterUserParams) => {
    try {
      const response = await registerUser({
        email: values.email,
        password: values.password,
        nickname: values.nickname,
        phone_number: values.phone_number,
      }).unwrap();

      console.log('Registration successful', response);
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Зарегистрироваться</h2>
      <p>
        Уже есть аккаунт?
        <span onClick={() => setView('login')}>Войти</span>
      </p>
      <div className='mt-4'>
        <label htmlFor='email'>
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
      <div className='mt-4'>
        <label htmlFor='nickname'>
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
      <div className='mt-4'>
        <label htmlFor='phoneNumber'>
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
            {errors.phone_number && <span>{errors.phone_number?.message}</span>}
          </FormErrorMessage>
        </label>
      </div>
      <div className='mt-4'>
        <label htmlFor='password'>
          <span>Пароль</span>
          <FormControl isInvalid={!!errors.password} zIndex='1'>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                borderRadius='16px'
                _focusVisible={{ boxShadow: 'none' }}
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Поле обязательно для заполнения',
                  },
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
      <button type='submit'>Зарегистрироваться</button>
    </form>
  );
};

export default Registration;
