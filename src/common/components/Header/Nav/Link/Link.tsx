import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

interface IProps {
  isActive: boolean;
  path: string;
  name: string;
}

export const Link: FC<IProps> = ({ isActive, path, name }) => {
  return (
    <Box
      className={isActive ? 'text-mainColor' : 'text-darkGray'}
      fontWeight={isActive ? '700' : '500'}
      to={path}
      as={RouterLink}
    >
      {name}
    </Box>
  );
};
