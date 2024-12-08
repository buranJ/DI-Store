import { ResponsiveContainer } from 'common/ui';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import bannerImg from 'assets/images/About/desktop-banner-img.png';
import phraseImg from 'assets/images/About/desktop-phrase.png';
import featuresImg from 'assets/images/About/desktop-features.png';
import sliderImg1 from 'assets/images/About/slider-img-1.png';
import sliderImg2 from 'assets/images/About/slider-img-2.png';
import sliderImg3 from 'assets/images/About/slider-img-3.png';
import sliderImg4 from 'assets/images/About/slider-img-4.png';

import 'swiper/css';
import 'swiper/css/pagination';

const AboutDesktop = () => {
  return (
    <>
      <h1 className='font-bold text-center my-[20px] text-[22px] tablet:text-[30px]'>
        Di Store – магазин косметики
      </h1>
      <ResponsiveContainer>
        <div className='flex justify-center'>
          <img src={bannerImg} alt='' className='mb-[26px]' />
        </div>
        <img src={phraseImg} alt='' />
        <h2 className='font-bold text-center mt-[50px] mb-[30px] text-[30px]'>
          Как появился Di Store?
        </h2>
        <div className='grid grid-cols-2 mt-[20px] gap-[25px]'>
          <p className='text-[15px] leading-tight 2xl:text-[20px]'>
            Наша основательница – Даяна, хотела помогать людям через свое дело.
            <br />
            <br />
            Идея открыть магазин косметики пришла с личной необходимостью – в
            городе было мало качественной косметики для очень чувствительной и
            капризной кожи как у Даяны. Все началось с маленькой полочки в ее
            комнате в 2017. Она проходила курсы по космецевтике, изучала
            составы, искала работающие средства и рассказывала о своих находках
            в соц сетях. Шло время, росло количество консультаций, заказов, и
            единомышленников вокруг. В 2020 году открылся первый магазин Di
            Store и все полки опустели в первый же день.
            <br />
            <br />
            Сегодня Di Store- магазин с тысячами довольных клиентов, сильной
            командой и большими планами на будущее. Мы постоянно улучшаем свои
            знания и навыки, чтобы быть полезными вам!
          </p>
          <img src={featuresImg} alt='' />
        </div>
      </ResponsiveContainer>
      <div className='grid grid-cols-2 py-[26px] px-[21px] bg-[#CCD47C] text-center gap-[30px] mt-[26px] tablet:grid-cols-3'>
        <div>
          <h3 className='font-bold text-[50px] text-white leading-tight'>
            5 лет
          </h3>
          <span className='font-medium text-[25px]'>на рынке</span>
        </div>
        <div>
          <h3 className='font-bold text-[50px] text-white leading-tight'>
            15к
          </h3>
          <span className='font-medium text-[25px]'>клиентов</span>
        </div>
        <div>
          <h3 className='font-bold text-[50px] text-white leading-tight'>
            100+
          </h3>
          <span className='font-medium text-[25px]'>брендов</span>
        </div>
        <div>
          <h3 className='font-bold text-[50px] text-white leading-tight'>
            3000+
          </h3>
          <span className='font-medium text-[25px]'>позиций</span>
        </div>
        <div>
          <h3 className='font-bold text-[50px] text-white leading-tight'>
            20+
          </h3>
          <span className='font-medium text-[25px]'>консультаций</span>
        </div>
        <div>
          <h3 className='font-bold text-[50px] text-white leading-tight'>
            1000+
          </h3>
          <span className='font-medium text-[25px]'>отзывов</span>
        </div>
      </div>
      <ResponsiveContainer>
        <h2 className='font-bold text-center my-[50px] text-[30px]'>
          Наши сотрудники
        </h2>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className='mySwiper !pb-[50px] mb-[50px]'
          spaceBetween={30}
          slidesPerView={4}
        >
          <SwiperSlide>
            <div className='text-center flex flex-col'>
              <img src={sliderImg1} alt='' />
              <h3 className='font-bold text-[20px] tablet:text-[26px]'>
                Сабина
              </h3>
              <span className='text-[15px] mt-[5px]'>Менеджер</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='text-center flex flex-col'>
              <img src={sliderImg2} alt='' />
              <h3 className='font-bold text-[20px] tablet:text-[26px]'>
                Айзат
              </h3>
              <span className='text-[15px] mt-[5px]'>Онлайн - консультант</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='text-center flex flex-col'>
              <img src={sliderImg3} alt='' />
              <h3 className='font-bold text-[20px] tablet:text-[26px]'>
                Асель
              </h3>
              <span className='text-[15px] mt-[5px]'>Контент мейкер</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='text-center flex flex-col'>
              <img src={sliderImg4} alt='' />
              <h3 className='font-bold text-[20px] tablet:text-[26px]'>
                Айпери
              </h3>
              <span className='text-[15px] mt-[5px]'>Продавец консультант</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='text-center flex flex-col'>
              <img src={sliderImg1} alt='' />
              <h3 className='font-bold text-[20px] tablet:text-[26px]'>
                Сабина
              </h3>
              <span className='text-[15px] mt-[5px]'>Менеджер</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='text-center flex flex-col'>
              <img src={sliderImg2} alt='' />
              <h3 className='font-bold text-[20px] tablet:text-[26px]'>
                Айзат
              </h3>
              <span className='text-[15px] mt-[5px]'>Онлайн - консультант</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </ResponsiveContainer>
    </>
  );
};

export default AboutDesktop;
