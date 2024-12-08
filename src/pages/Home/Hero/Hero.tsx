import { useGetRandomBrandsQuery } from 'api/common/brands.api';

import ArrowBackPage from 'assets/icons/arrow-back-page.svg';
import circleLogo from 'assets/icons/Home/circle-logo.svg';
import logo from 'assets/icons/logo.svg';

import DesktopHero from './DesktopHero';
import MobileHero from './MobileHero';

import 'swiper/css';
import './style.scss';

export const Hero = () => {
  const { data } = useGetRandomBrandsQuery({ count: 45 });

  const slides = data?.filter((item) => item.image_url);

  const upperSlider = slides?.slice(0, Math.round(slides.length / 2));

  const lowerSlider = slides?.slice(
    Math.round(slides.length / 2),
    slides.length
  );

  return (
    <section className='hero'>
      <div className='flex justify-center py-[30px]'>
        <img src={logo} alt='' />
      </div>
      <h2 className='flex justify-center items-center gap-3 font-bold text-[22px] lg-md:text-[40px]'>
        <img
          src={ArrowBackPage}
          alt=''
          className='next w-[30px] h-[30px] lg-md:w-[40px] lg-md:h-[40px]'
        />
        Оригинальные бренды
        <img
          src={ArrowBackPage}
          alt=''
          style={{ transform: 'rotate(180deg)' }}
          className='prev lg-md:w-[40px] lg-md:h-[40px]'
        />
      </h2>
      <>
        <DesktopHero upperSlider={upperSlider} lowerSlider={lowerSlider} />
        <MobileHero sliderItem={slides} />
      </>
      <div className='hero__logo'>
        <img
          src={circleLogo}
          alt=''
          className='-mt-[20%] ml-[41%] lg-md:hidden'
        />
        <img src={circleLogo} alt='' className='hidden lg-md:inline logo-1' />
        <img src={circleLogo} alt='' className='hidden lg-md:inline logo-2' />
        <img src={circleLogo} alt='' className='hidden lg-md:inline logo-3' />
      </div>
    </section>
  );
};
