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

const AboutMobile = () => {
  return (
    <>
      <h1 className='font-bold text-center my-[20px] text-[22px] tablet:text-[30px]'>
        Di Store – магазин косметики
      </h1>
      <ResponsiveContainer>
        <div className='flex justify-center'>
          <img src={bannerImg} alt='' className='mb-[26px]' />
        </div>
        <h2 className='font-bold text-center mb-[20px] text-[22px] tablet:text-[30px]'>
          Как появился Di Store?
        </h2>
        <img src={phraseImg} alt='' />
        <p className='text-[16px] mt-[20px]'>
          Наша основательница – Даяна, хотела помогать людям через свое дело.
          <br />
          <br />
          Идея открыть магазин косметики пришла с личной необходимостью – в
          городе было мало качественной косметики для очень чувствительной и
          капризной кожи как у Даяны. Все началось с маленькой полочки в ее
          комнате в 2017. Она проходила курсы по космецевтике, изучала составы,
          искала работающие средства и рассказывала о своих находках в соц
          сетях. Шло время, росло количество консультаций, заказов, и
          единомышленников вокруг. В 2020 году открылся первый магазин Di Store
          и все полки опустели в первый же день.
          <br />
          <br />
          Сегодня Di Store- магазин с тысячами довольных клиентов, сильной
          командой и большими планами на будущее. Мы постоянно улучшаем свои
          знания и навыки, чтобы быть полезными вам!
        </p>
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
        <h2 className='font-bold text-center my-[20px] text-[22px] tablet:text-[30px]'>
          Преимущества
        </h2>
        <div className='grid grid-cols-2 gap-[15px]'>
          <img src={featuresImg} alt='' />
          <p className='text-[16px] tablet:text-[25px]'>
            В нашем магазине представлены средства по уходу за кожей, а также
            декоративная косметика самых топовых брендов Кореи, Европы и Америки
            прямиком с заводов-производителей!
          </p>
        </div>
        <p className='text-[16px] mt-[20px] tablet:text-[25px]'>
          Мы предоставляем только оригинальную продукцию по самым демократичным
          ценам. В нашем магазине представлены более 100 брендов. У нас
          действует система лояльности клиентов. Все наши консультанты обучены
          предоставлять качественные консультации, которые помогут вам подобрать
          индивидуальный уход, исходя из типа вашей кожи. Все консультации
          бесплатны!
        </p>
        <h2 className='font-bold text-center my-[20px] text-[22px]'>
          Наши сотрудники
        </h2>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className='mySwiper !pb-[30px] mb-[50px]'
          spaceBetween={30}
          slidesPerView={2}
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

export default AboutMobile;
