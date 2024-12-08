import { useEffect } from 'react';
import { useHeader } from 'common/hooks';
import { Consultation, FollowInst } from 'common/components';
import AboutDesktop from './AboutDesktop';
import AboutMobile from './AboutMobile';

import './style.scss';

export const About = () => {
  const headerContext = useHeader();

  useEffect(() => {
    headerContext?.handleIconsHide(false);
    headerContext?.handleSearchHide(true);
    headerContext?.handleShowArrow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className='about-shop laptop:hidden'>
        <AboutMobile />
      </section>
      <section className='about-shop hidden laptop:block'>
        <AboutDesktop />
      </section>
      <Consultation />
      <FollowInst />
    </>
  );
};
