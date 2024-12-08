import { FC } from 'react';
import {
  Box,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
  Collapse,
} from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import instagram from 'assets/icons/instagram-colored.svg';
import whatsapp from 'assets/icons/whatsapp-colored.svg';
import telegram from 'assets/icons/telegram-colored.svg';
import LanguageDropdown from './LanguageDropdown/LanguageDropdown';
import CategoriesTab from './CategoriesTab/CategoriesTab';

import './style.scss';

interface IProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export const MenuDrawer: FC<IProps> = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const pages = [
    {
      name: 'Главная',
      path: '/',
    },
    {
      name: 'Каталог',
      path: '/catalog',
    },
    {
      name: 'О нас',
      path: '/about',
    },
    {
      name: 'Контакты',
      path: '/contacts',
    },
  ];

  return (
    <Box
      as={Collapse}
      in={isOpen}
      animateOpacity
      position='absolute'
      left='0'
      w='100%'
      bg='white'
      className='!h-dvh !overflow-auto lg-md:hidden'
      zIndex={999}
    >
      <Tabs h='100%'>
        <TabList
          color='mainColor'
          borderTop='2px'
          borderColor={'mainColor'}
          outline='none'
        >
          <Tab
            _selected={{
              backgroundColor: 'mainColor',
              color: 'white',
              fontWeight: 700,
            }}
            fontSize='22px'
            fontWeight={500}
            _active={{ backgroundColor: 'mainColor' }}
            width='50%'
          >
            Меню
          </Tab>
          <Tab
            _selected={{
              backgroundColor: 'mainColor',
              color: 'white',
              fontWeight: 700,
            }}
            fontSize='22px'
            fontWeight={500}
            width='50%'
          >
            Категории
          </Tab>
        </TabList>

        <TabPanels height='100%'>
          <TabPanel height='90%' p={0} display='flex' flexDirection='column'>
            <ul className='nav'>
              {pages.map(({ name, path }) => (
                <span key={name}>
                  <Box
                    as={NavLink}
                    onClick={() => onClose(false)}
                    key={name}
                    color={path === pathname ? 'mainColor' : '#B1B1B1'}
                    fontWeight={500}
                    to={path}
                  >
                    <li>{name}</li>
                  </Box>
                  <Divider color={'mainColor'} />
                </span>
              ))}
            </ul>
            <Box gap='15px' px='30px' mt='auto'>
              <LanguageDropdown />
              <Box display='flex' gap='15px' mt='13px'>
                <a
                  href='https://www.instagram.com/di_store_kg/'
                  target='_blank'
                >
                  <Image src={instagram} alt='instagram' />
                </a>
                <a href='https://wa.link/poxfrd' target='_blank'>
                  <Image src={whatsapp} alt='whatsapp' />
                </a>
                <a href='https://t.me/di_store_kg' target='_blank'>
                  <Image src={telegram} alt='telegram' />
                </a>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <CategoriesTab onClose={onClose} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
