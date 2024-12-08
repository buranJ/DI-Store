import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ImageComponent from '../HelperComponent';

import { IBrand } from 'types/entities';

interface IProps {
  sliderItem?: IBrand[];
}

export const MobileHero: FC<IProps> = ({ sliderItem }) => {
  return (
    <div className='hero__content flex lg-md:hidden'>
      <Swiper
        dir='rtl'
        modules={[Navigation]}
        navigation={{
          nextEl: '.hero h2 .next',
          prevEl: '.hero h2 .prev',
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 2.3,
          },
        }}
        className='mySwiper w-[100%] m-[18px]'
      >
        {sliderItem?.map((item: IBrand) => (
          <SwiperSlide key={item.id} className='rounded-[34px]'>
            <Link
              to='/catalog'
              state={{
                brandName: item.name,
              }}
              className='hero__item'
            >
              <ImageComponent url={item?.image_url} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
