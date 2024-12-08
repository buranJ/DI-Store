import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from 'api/auth/auth.api';
import { useToastNotification } from 'common/hooks';

import {
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

import Eye from 'assets/icons/eye.svg?react';
import EyeOff from 'assets/icons/eye-gray.svg?react';

interface ILoginProps {
  setView: (value: 'login' | 'registration' | 'forgotPassword') => void;
}

interface IInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: FC<ILoginProps> = ({ setView }) => {
  const [login, { error, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const notify = useToastNotification();

  useEffect(() => {
    if (isSuccess) {
      setView('login');
      notify.onCreated({ title: 'Вы успешно вошли в аккаунт' });
      navigate('/');
    }
    if (error) {
      notify.onError({ title: 'Неверное имя пользователя или пароль' });
    }
  }, [error, isSuccess, navigate, setView, notify]);

  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>();

  const onSubmit = async (values: IInputs) => {
    try {
      const formData = new FormData();
      formData.append('username', values.email);
      formData.append('password', values.password);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error

      await login(formData).unwrap();
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Войти</h2>
      <p>
        Все еще нет аккаунта?
        <span onClick={() => setView('registration')}>Зарегистрироваться</span>
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
        <label htmlFor='password'>
          <span>Пароль</span>
          <FormControl isInvalid={!!errors.password}>
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
      <div className='auth__forms-bottom mt-4'>
        <label htmlFor='checkbox'>
          <input
            type='checkbox'
            id='checkbox'
            defaultChecked={false}
            {...register('rememberMe')}
          />
          <span>Запомнить меня</span>
        </label>
        <span onClick={() => setView('forgotPassword')}>Забыли пароль?</span>
      </div>
      <button type='submit'>Войти</button>
    </form>
  );
};

export default Login;
