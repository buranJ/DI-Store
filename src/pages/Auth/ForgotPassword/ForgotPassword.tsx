import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForgotPasswordMutation } from 'api/auth/auth.api';
import '../index.scss';

interface IProps {
  setView: (value: 'login' | 'registration' | 'forgotPassword') => void;
}

export const ForgotPassword: FC<IProps> = ({ setView }) => {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword = async (data: { email: string }) => {
    await forgotPassword({ email: data.email });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleForgotPassword)} className='form'>
        <FormControl>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            type='email'
            {...register('email', {
              required: 'required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
          />
        </FormControl>
        <button type='submit'>Отправить</button>
        <button onClick={() => setView('login')}>
          Вернуться к форме входа
        </button>
      </form>
    </>
  );
};
