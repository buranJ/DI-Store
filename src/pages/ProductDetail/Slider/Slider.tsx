import { useState } from 'react';

import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';

import { defaultImage } from 'common/constants';

import { useRemoveFavoriteMutation, useSetFavoriteMutation } from 'api/common/products.api';
import { IProductImage } from 'types/entities';

import HeartIcon from 'assets/icons/heart-red.svg?react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import './style.scss';

interface IProps {
  images?: IProductImage[];
  alt?: string;
  productId?: string;
}

export default function Slider({
  images = [],
  alt = 'Изображение товара',
  productId = '',
}: IProps) {
  const [addFavorite] = useSetFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const displayImages =
    images.length > 0 ? images : [{ url: defaultImage, id: 'default' }];

  const handleAddFavorite = async () => {
    try {
      await addFavorite({ product_id: productId });
      setIsFavorite(true);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await removeFavorite({ product_id: productId });
      setIsFavorite(false);
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFavorite();
    } else {
      handleAddFavorite();
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className='mySwiper2'
      >
        {/* Иконка избранного */}
        <div onClick={toggleFavorite} className='favorite-icon'>
          <HeartIcon
            width='40px'
            height='36px'
            style={{
              fill: isFavorite ? '#EB0000' : 'none',
              stroke: '#EB0000',
              cursor: 'pointer',
            }}
          />
        </div>

        {displayImages.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='product__slide'>
              <img src={item.url} alt={alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className='mySwiper mt-8'
      >
        {displayImages.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.url} alt={alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
