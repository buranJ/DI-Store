import { Show } from '@chakra-ui/react';

import { ResponsiveContainer } from 'common/ui';

import logo from 'common/assets/icons/logo.svg';
import imgMobile from 'common/assets/images/about-block-img-mobile.png';
import imgDesktop from 'common/assets/images/about-block-img-desktop.png';
import colour1 from 'common/assets/images/about-block-colour-1.png';
import colour2 from 'common/assets/images/about-block-colour-2.png';
import colour3 from 'common/assets/images/about-block-colour-3.png';


export const AboutBlock = () => {
  return (
    <section className='about-block relative mt-[150px]'>
      <img
        src={colour1}
        alt=''
        className='w-[76px] md:w-[201px] absolute -top-[28px] md:-top-[128px] right-0'
      />
      <img
        src={colour2}
        alt=''
        className='w-[82px] h-[87px] absolute bottom-[159px] md:bottom-[420px] left-0 sm:scale-[2] md:scale-[2.5] xl:scale-[3.5]'
      />
      <img
        src={colour3}
        alt=''
        className='w-[71px] md:w-[188px] absolute -bottom-12 md:-bottom-36 right-0'
      />
      <ResponsiveContainer>
        <Show breakpoint='(max-width: 769px)'>
          <div className='about-block__content'>
            <div className='about-block__img mb-4 flex justify-center'>
              <img src={imgMobile} alt='' className='w-full' />
            </div>
            <p className='about-block__info text-center leading-5 text-darkGray text-lg flex items-center flex-col gap-2.5'>
              <img src={logo} alt='' width={188} />В нашем магазине только
              оригинальная продукция по доступным ценам и более 100 брендов.
              Действует система лояльности. Консультанты помогут вам подобрать
              уход с учетом типа кожи. И самое приятное — все консультации
              бесплатны!
            </p>
          </div>
        </Show>
        <Show breakpoint='(min-width: 769px)'>
          <div className='flex justify-center'>
            <img src={logo} alt='' />
          </div>
          <div className='about-block__content flex items-center gap-7 mt-14'>
            <div className='about-block__img mb-4'>
              <img src={imgDesktop} alt='' />
            </div>
            <p className='about-block__info text-darkGray max-w-[40%] md:text-xl lg:text-3xl'>
              Мы предоставляем только оригинальную продукцию по самым
              демократичным ценам. В нашем магазине представлены более 100
              брендов. У нас действует система лояльности клиентов. Все наши
              консультанты обучены предоставлять качественные консультации,
              которые помогут вам подобрать индивидуальный уход, исходя из типа
              вашей кожи. Все консультации бесплатны!
            </p>
          </div>
        </Show>
      </ResponsiveContainer>
    </section>
  );
};
