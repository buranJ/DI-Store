import { Box, Image } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import ArrowBackPage from 'assets/icons/arrow-back-page.svg';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
  isAdaptiveShow?: boolean;
}

export const HeadingPage: FC<IProps> = ({ children, isAdaptiveShow = false }) => {
  const navigate = useNavigate();
  return (
    <>
      <Box display={{ base: isAdaptiveShow ? 'flex' : 'none', lg: 'flex' }} justifyContent='space-between' className='py-7'>
        <Image src={ArrowBackPage} onClick={() => navigate(-1)} className='cursor-pointer'/>
        <Box>{children}</Box>
        <Box></Box>
      </Box>
    </>
  );
};
