import { FC } from 'react';

import { Box, Image, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Slide1 from 'assets/images/slide1.png';
import Slide2 from 'assets/images/slide2.png';

import { sliderConfig } from './PopularProductsSlider.helpers';

import 'swiper/scss';
import 'swiper/scss/pagination';
import './index.scss';

interface Product {
  id: number;
  imageUrl?: string;
}

const products: Product[] = [
  {
    id: 1,
    imageUrl: Slide1,
  },
  {
    id: 2,
    imageUrl: Slide2,
  },
  {
    id: 3,
    imageUrl: Slide2,
  },
];

export const PopularProductsSlider: FC = () => {
  return (
    <Box mt='150px' ml='auto' maxW='93%'>
      <Text fontSize='2xl' fontWeight='bold' mb={4}>
        Популярные товары
      </Text>
      <Swiper className='mySwiper' {...sliderConfig}>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Box bg='white' borderRadius='47px' overflow='hidden'>
              {product.imageUrl && <Image src={product.imageUrl} />}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
