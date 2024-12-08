import { useEffect } from 'react';

import { useHeader } from 'common/hooks';
import { ResponsiveContainer } from 'common/ui';

import { Consultation } from './Сonsultation';

import schedule from 'assets/icons/Contacts/schedule.svg';
import phone from 'assets/icons/Contacts/phone.svg';
import location from 'assets/icons/Contacts/location.svg';
import mail from 'assets/icons/Contacts/mail.svg';

import './index.scss';

export const Contacts = () => {
  const headerContext = useHeader();

  useEffect(() => {
    headerContext?.handleShowArrow(true);
  }, [headerContext]);

  return (
    <section className='contacts'>
      <ResponsiveContainer>
        <div className='contacts__top mt-12'>
          <div className='contacts__item'>
            <img
              src={schedule}
              alt=''
              className='w-[70px] h-[70px] lg-md:w-[90px] lg-md:h-[90px]'
            />
            <a>
              10:00 - 21:00
            </a>
            <p>Работаем ежедневно</p>
          </div>
          <div className='contacts__item'>
            <img
              src={phone}
              alt=''
              className='w-[70px] h-[70px] lg-md:w-[90px] lg-md:h-[90px]'
            />
            <a href='tel:+996706918918' target='_blank'>
              +996 706 918 918
            </a>
            <p>Получить консультацию у наших специалистов</p>
          </div>
          <div className='contacts__item'>
            <img
              src={location}
              alt=''
              className='w-[70px] h-[70px] lg-md:w-[90px] lg-md:h-[90px]'
            />
            <a className='address' href='https://go.2gis.com/9jbf2' target='_blank'>
              Медерова 44/1
            </a>
            <a className='address' href='https://go.2gis.com/gfge4' target='_blank'>
              Ибраимова 115/1
            </a>
            <a className='address' href='#' target='_blank'>
              Арстанбека Дуйшеева, 12
            </a>
          </div>
          <div className='contacts__item'>
            <img
              src={mail}
              alt=''
              className='w-[70px] h-[70px] lg-md:w-[90px] lg-md:h-[90px]'
            />
            <a href='mailto:Distore.biz@gmail.com' target='_blank'>
              Distore.biz@gmail.com
            </a>
            <p>Получить консультацию у наших специалистов</p>
          </div>
        </div>
        <div className='contacts__content my-12'>
          <Consultation />
        </div>
      </ResponsiveContainer>
    </section>
  );
};
