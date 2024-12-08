import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Box, IconButton } from '@chakra-ui/react';
import Home from 'assets/icons/home.svg?react';
import Heart from 'assets/icons/heart.svg?react';
import User from 'assets/icons/account.svg?react';

export const BottomNavBar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Box
      as='nav'
      position='fixed'
      bottom='0'
      width='100%'
      bg='white'
      display='flex'
      justifyContent='space-around'
      padding='1rem'
      boxShadow='0px -2px 15px 0px #0000001A'
      className='bg-white flex justify-around p-4 shadow-md'
    >
      <IconButton
        as={Link}
        aria-label='Home'
        icon={<Home />}
        isRound
        size='lg'
        bg='transparent'
        to={{ pathname: '/' }}
        color={pathname === '/' ? 'white' : 'mainColor'}
        className={pathname === '/' ? '!bg-mainColor' : '!bg-none'}
      />
      <IconButton
        as={Link}
        aria-label='Favorites'
        icon={<Heart />}
        isRound
        size='lg'
        bg='transparent'
        to={{ pathname: '/favorites' }}
        color={pathname === '/favorites' ? 'white' : 'mainColor'}
        className={pathname === '/favorites' ? '!bg-mainColor' : '!bg-none'}
      />
      <IconButton
        as={Link}
        aria-label='Profile'
        icon={<User />}
        isRound
        size='lg'
        bg='transparent'
        to={{ pathname: '/profile' }}
        color={pathname === '/profile' ? 'white' : 'mainColor'}
        className={pathname === '/profile' ? '!bg-mainColor' : '!bg-none'}
      />
    </Box>
  );
};
