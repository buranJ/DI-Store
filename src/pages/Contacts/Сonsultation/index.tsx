import { useForm } from 'react-hook-form';

import { useGetHelpMutation } from 'api/common/help.api';
import { useToastNotification } from 'common/hooks';

import './index.scss';

interface FormData {
  phone: string;
  email: string;
}

export const Consultation = () => {
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
      notify.onError({
        description: 'Пожалуйста, попробуйте снова.',
      });
    }
  };
  return (
    <div className='consultation'>
      <div className='consultation__content'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2053.834935368621!2d74.61379918338676!3d42.85162804001047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7daf7d2bbcd%3A0x3cddbe51c78a8930!2sDi_store%20kg!5e0!3m2!1sru!2skg!4v1731063633473!5m2!1sru!2skg'
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-[40px] sm:mt-0'>
          <h2>У вас есть вопросы к нам?</h2>
          <p>Наш менеджер свяжется с вами в ближайшее время</p>
          <input
            className='consultation__name-input'
            type='text'
            placeholder='Имя'
          />
          <input
            className='consultation__phone-input'
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
            className='consultation__email-input'
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
          <button type='submit' disabled={isLoading}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};
