import { useRef } from 'react';

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
