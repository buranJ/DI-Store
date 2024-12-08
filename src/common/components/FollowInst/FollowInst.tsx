import { ResponsiveContainer } from 'common/ui';
import followInst from 'assets/images/follow-inst-img.png';

import './index.scss';

export const FollowInst = () => {
  return (
    <ResponsiveContainer>
      <section className='follow-inst my-[50px]'>
        <h2>Следите за нами в Instagram</h2>
        <div className='follow-inst__content flex justify-center'>
          <a
            href='https://www.instagram.com/di_store_kg/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={followInst} alt='' />
          </a>
        </div>
      </section>
    </ResponsiveContainer>
  );
};
