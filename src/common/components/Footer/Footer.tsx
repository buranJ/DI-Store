import {
  Box,
  Flex,
  Icon,
  Image,
  Show,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import { BottomNavBar } from './BotomNavbar';

import { ResponsiveContainer } from 'common/ui';

import logo from 'assets/icons/logo-white.svg';
import Instagram from 'assets/icons/instagram.svg?react';
import Telegram from 'assets/icons/telegram.svg?react';
import Whatsapp from 'assets/icons/whatsapp.svg?react';

type Link = {
  label: string;
  href?: string; // Если ссылка есть
  state?: Record<string, string>; // Для передачи состояния, например, в каталог
};

type FooterSection = {
  title: string;
  links: Link[]; // Ссылки для каждой секции
};

const footerData: FooterSection[] = [
  {
    title: 'Аккаунт',
    links: [
      { label: 'Аккаунт', href: '/my-acc' },
      { label: 'Мой заказ', href: '/order-tracking' },
      { label: 'Корзина', href: '/basket' },
      { label: 'Список желаний', href: '/favorites' },
    ],
  },
  {
    title: 'Меню',
    links: [
      {
        label: 'База под макияж',
        href: '/catalog',
        state: { categoryName: 'База под макияж' },
      },
      {
        label: 'Для ресниц',
        href: '/catalog',
        state: { categoryName: 'Для ресниц' },
      },
      {
        label: 'Умывашки',
        href: '/catalog',
        state: { categoryName: 'Умывашки' },
      },
      {
        label: 'Солнцезащитные крема',
        href: '/catalog',
        state: { categoryName: 'Солнцезащитные крема' },
      },
      {
        label: 'Кремы для тела',
        href: '/catalog',
        state: { categoryName: 'Кремы для тела' },
      },
      {
        label: 'Гели для душа',
        href: '/catalog',
        state: { categoryName: 'Гели для душа' },
      },
      {
        label: 'Наборы парфюм',
        href: '/catalog',
        state: { categoryName: 'Наборы парфюм' },
      },
    ],
  },
  {
    title: 'Полезное',
    links: [
      { label: 'Политика конфиденциальности', href: '/privacy-policy' },
      { label: 'Возврат товара', href: '/return' },
      { label: 'Правила оформления заказа', href: '/rules-of-offer' },
      { label: 'Правила продажи товаров', href: '/rules-of-sale' },
      { label: 'Публичная оферта', href: '/public-offer' },
      { label: 'Правила оплаты и возврата денежных средств', href: '/refund' },
    ],
  },
  {
    title: 'Адрес',
    links: [
      { label: 'Медерова 44/1, бутик В6', href: 'https://go.2gis.com/9jbf2' },
      { label: 'Ибраимова 115/1', href: 'https://go.2gis.com/tyt0h' },
      { label: 'Арстанбека Дуйшеева, 12', href: '#' },
      { label: 'Ежедневно с 10:00 до 21:00' },
      { label: 'Distore.biz@gmail.com', href: 'mailto:Distore.biz@gmail.com' },
    ],
  },
];

const socialLinks = [
  { icon: Telegram, href: '#' },
  { icon: Instagram, href: 'https://www.instagram.com/di_store_kg/' },
  { icon: Whatsapp, href: 'https://wa.link/poxfrd' },
];

export const Footer = () => {
  return (
    <Box bg='black'>
      <Show below='lg'>
        <BottomNavBar />
      </Show>
      <ResponsiveContainer>
        <Show above='lg'>
          <Box color='white' py={10}>
            <Flex
              justify='space-around'
              wrap='wrap'
              className='text-white py-10'
            >
              {footerData.map((section) => (
                <Box maxW='211px' key={section.title}>
                  <Text fontWeight='bold' mb={2}>
                    {section.title}
                  </Text>
                  <Stack>
                    {section.links.map((link, index) =>
                      link.href ? (
                        <Link
                          key={index}
                          to={link.href}
                          state={link.state}
                          className='hover:underline text-[14px]'
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Text key={index}>{link.label}</Text>
                      )
                    )}
                  </Stack>
                </Box>
              ))}
            </Flex>

            <Flex justify='center' align='center' mt={10}>
              <Image src={logo} />
            </Flex>

            <Flex justify='center' mt={4}>
              {socialLinks.map((social, index) => (
                <ChakraLink
                  key={index}
                  href={social.href}
                  mx={2}
                  target='_blank'
                >
                  <Icon as={social.icon} w={6} h={6} />
                </ChakraLink>
              ))}
            </Flex>
          </Box>
        </Show>
      </ResponsiveContainer>
    </Box>
  );
};
