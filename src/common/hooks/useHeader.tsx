import { HeaderContextState } from 'contexts/HeaderContext';
import { useContext } from 'react';

export const useHeader = () => {
  const headerContext = useContext(HeaderContextState);

  if (!headerContext)
    throw new Error('useHeader must be used within a HeaderProvider');

  return headerContext;
};
