import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { FaFacebook } from 'react-icons/fa';
import { withRouter, Link } from 'react-router-dom';

import { login } from 'containers/Profile/actions';

import styles from './styles.module.scss';

const LoginForm = withRouter(({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className={cn(styles['form-registration'], 'w-full h-full max-w-xs')}>
      <form onSubmit={handleLogin} className=' px-8 pt-6 pb-8 '>
        <div className='mb-4'>
          <label>
            {t('AuthForms.email')}
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder={t('AuthForms.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label>
            {t('AuthForms.password')}
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='*************'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className='flex appearance-none items-center justify-between mb-4'>
          <Link to='/forgot' className='text-xs'>
            {t('AuthForms.forgot')}
          </Link>
        </div>

        <div className='flex items-center justify-start'>
          <button
            type='submit'
            className='font-bold rounded py-1 px-6 mr-2 border border-transparent text-secondary bg-primary shadow uppercase'
          >
            {t('AuthForms.login')}
          </button>
          <button
            type='button'
            className='opacity-50 hover:opacity-100 font-bold rounded py-1 px-6 border border-primary bg-transparent shadow uppercase'
            onClick={() => history.push('/registration')}
          >
            {t('AuthForms.signup')}
          </button>
        </div>
        <div className='block mt-8'>
          <a href='/api/auth/fb'>
            <FaFacebook />
          </a>
          {/* <button onClick={() => history.push('/social')}>
            <FaFacebook />
          </button> */}
        </div>
      </form>
    </div>
  );
});

export default LoginForm;
