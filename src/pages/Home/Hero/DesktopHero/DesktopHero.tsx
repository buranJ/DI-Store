import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FC } from 'react';
import { IBrand } from 'types/entities';
import { Link } from 'react-router-dom';
import ImageComponent from '../HelperComponent';

interface IProps {
  upperSlider?: IBrand[];
  lowerSlider?: IBrand[];
}

export const DesktopHero: FC<IProps> = ({ upperSlider, lowerSlider }) => {
  return (
    <div className='hero__content mt-[30px] hidden lg-md:block'>
      <Swiper
        modules={[Navigation]}
        slidesPerView={4.3}
        spaceBetween={39}
        navigation={{
          nextEl: '.hero h2 .next',
          prevEl: '.hero h2 .prev',
        }}
        className='w-[90%] !m-0 !ml-auto'
      >
        {upperSlider?.map((item: IBrand) => (
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
      <div className='mt-[30px]'></div>
      <Swiper
        dir='rtl'
        modules={[Navigation]}
        slidesPerView={4.3}
        navigation={{
          nextEl: '.hero h2 .next',
          prevEl: '.hero h2 .prev',
        }}
        className='w-[90%] !m-0 !mr-auto'
      >
        {lowerSlider?.map((item: IBrand) => (
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
