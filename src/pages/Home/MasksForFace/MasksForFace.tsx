import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ResponsiveContainer } from 'common/ui';

import 'swiper/css';
import './index.scss';

export const MasksForFace: FC = () => {
  return (
    <section className='masks-for-face'>
      <ResponsiveContainer>
        <div className='masks-for-face__content'>
          <div className='container'>
            <div className='masks-for-face__content'>
              <Link
                to='/catalog'
                state={{
                  categoryName: 'Маски для лица',
                }}
              >
                Маски для лица
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9.60009 24L19.8401 14.4L9.60009 4.8'
                    stroke='black'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Link>
              <div className='flex justify-center mx-auto'>
                <img
                  src='/assets/MasksForFace/MasksForFace-img-1.png'
                  alt=''
                  className='w-full'
                />
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};
