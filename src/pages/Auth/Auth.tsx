import { useState } from 'react';
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';

import bg from 'assets/images/Auth/auth-bg.png';

import './index.scss';

export const Auth = () => {
  const [view, setView] = useState<'login' | 'registration' | 'forgotPassword'>('login');

  return (
    <section className='auth'>
      <div className='auth__img'>
        <img src={bg} alt='' />
      </div>
      <div className='auth__content'>
        {view === 'login' && <Login setView={setView} />}
        {view === 'registration' && <Registration setView={setView} />}
        {view === 'forgotPassword' && <ForgotPassword setView={setView} />}
      </div>
    </section>
  );
};
