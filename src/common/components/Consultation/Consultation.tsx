import { useForm } from 'react-hook-form';

import { ResponsiveContainer } from 'common/ui';
import { useToastNotification } from 'common/hooks';

import reviewsImg from 'common/assets/images/reviews.png';

import { useGetHelpMutation } from 'api/common/help.api';

import './index.scss';

interface Props {
  reviews?: boolean;
  forms?: boolean;
}

interface FormData {
  phone: string;
  email: string;
}

export const Consultation = ({ reviews, forms = true }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [getHelp, { isLoading }] = useGetHelpMutation();
  const notify = useToastNotification();

  const onSubmit = async (data: FormData) => {
    try {
      await getHelp(data);
      reset(); // Сброс формы после успешной отправки
      notify.onCreated({
        title: 'Запрос успешно отправлен.',
        description: 'Мы свяжемся с вами в ближайшее время.',
      });
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      notify.onError();
    }
  };

  return (
    <section className='consultation'>
      <ResponsiveContainer>
        <div className='consultation__content sm:flex items-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex flex-col gap-4 bg-[#CCD47C] rounded-3xl px-4 py-8 ${
              forms ? '' : 'sm:hidden'
            }`}
          >
            <h2 className='text-center font-bold text-xl leading-5 sm:text-3xl'>
              Получите профессиональную консультацию специалиста
            </h2>

            <input
              className='consultation__phone-input py-2.5 px-5 rounded-full'
              type='text'
              placeholder='Телефон'
              {...register('phone', {
                required: 'Поле обязательно для заполнения',
                pattern: {
                  value: /^(\+996)(\d{9})$/, // Регулярное выражение для кыргызских номеров
                  message:
                    'Введите корректный номер телефона Кыргызстана (+996 XXX XXX XXX)',
                },
              })}
            />
            {errors.phone && (
              <p className='text-red-500'>{errors.phone.message}</p>
            )}

            <input
              className='consultation__email-input py-2.5 px-5 rounded-full'
              type='text'
              placeholder='Email'
              {...register('email', {
                required: 'Поле обязательно для заполнения',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Введите корректный email',
                },
              })}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}

            <button
              type='submit'
              className='rounded-full bg-black text-white py-2.5 sm:text-2xl'
              disabled={isLoading}
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
          <div
            className={`consultation__reviews w-full max-w-[50%] sm:block ${
              reviews ? '' : 'hidden'
            }`}
          >
            <img src={reviewsImg} alt='' />
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};
