import { ResponsiveContainer } from 'common/ui';
import masterCard from 'assets/images/mastercard.png';
import elsom from 'assets/images/elsom.png';
import elkart from 'assets/images/elkart.png';
import mbank from 'assets/images/mbank.png';
import visa from 'assets/images/visa.png';
import visa_mastercard from 'assets/images/visa_mastercard.png';

import './index.scss';

export const OnlinePay = () => {
  return (
    <ResponsiveContainer>
      <section className='online-pay'>
        <h2>Онлайн Оплата</h2>
        <div className='online-pay__content'>
          <img src={masterCard} alt='' />
          <img src={elsom} alt='' />
          <img src={elkart} alt='' />
          <img src={mbank} alt='' />
          <img src={visa} alt='' />
          <img src={visa_mastercard} alt='' />
        </div>
      </section>
    </ResponsiveContainer>
  );
};
