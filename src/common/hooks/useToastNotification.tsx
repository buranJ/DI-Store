import { useMemo } from 'react';
import { useToast, UseToastOptions } from '@chakra-ui/react';

type ToastHook = () => {
  onError: (customOptions?: UseToastOptions) => void;
  onUpdated: (customOptions?: UseToastOptions) => void;
  onCreated: (customOptions?: UseToastOptions) => void;
  onDeleted: (customOptions?: UseToastOptions) => void;
  inDevelopment: (customOptions?: UseToastOptions) => void;
};

export const COMMON: Omit<UseToastOptions, 'title'> = {
  duration: 3000,
  isClosable: true,
  position: 'top-right',
};

const ERROR_ARGS: UseToastOptions = {
  title: 'Что-то пошло не так',
  status: 'error',
  ...COMMON,
};
const UPDATED_ARGS: UseToastOptions = {
  title: 'Успешно обновлено',
  status: 'success',
  ...COMMON,
};
const CREATED_ARGS: UseToastOptions = {
  title: 'Успешно сохранено',
  status: 'success',
  ...COMMON,
};
const DELETED_ARGS: UseToastOptions = {
  title: 'Успешно удалено',
  status: 'success',
  ...COMMON,
};
const DEVELOPMENT_ARGS: UseToastOptions = {
  title: 'Эта функция находится в разработке',
  status: 'info',
  ...COMMON,
};

export const useToastNotification: ToastHook = () => {
  const toast = useToast();

  return useMemo(
    () => ({
      onError: (customOptions = {}) =>
        toast({ ...ERROR_ARGS, ...customOptions }),
      onUpdated: (customOptions = {}) =>
        toast({ ...UPDATED_ARGS, ...customOptions }),
      onCreated: (customOptions = {}) =>
        toast({ ...CREATED_ARGS, ...customOptions }),
      onDeleted: (customOptions = {}) =>
        toast({ ...DELETED_ARGS, ...customOptions }),
      inDevelopment: (customOptions = {}) =>
        toast({ ...DEVELOPMENT_ARGS, ...customOptions }),
    }),
    [toast]
  );
};
