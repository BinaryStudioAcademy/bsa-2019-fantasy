import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { FaFacebook } from 'react-icons/fa';
import { withRouter, Link } from 'react-router-dom';

import { login, setInviteCode } from 'containers/Profile/actions';
import useValidation from './useValidation';

import styles from './styles.module.scss';

const LoginForm = withRouter(({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    email,
    password,
    isEmailValid,
    isPasswordValid,
    emailChanged,
    passwordChanged,
    validateEmail,
    validatePassword,
  } = useValidation();

  useEffect(() => {
    if (history.location) {
      const { pathname } = history.location;
      const inviteCode = pathname.substring(pathname.lastIndexOf('/') + 1);
      if (inviteCode && inviteCode.length === 36) {
        dispatch(setInviteCode(inviteCode));
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = [validateEmail(), validatePassword()].every(Boolean);

    if (!valid) {
      return;
    }

    dispatch(login({ email, password }));
  };

  let [emailClass, passwordClass] = [[], []].map(
    () =>
      'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
  );

  return (
    <div className={cn(styles['form-registration'], 'w-full', 'max-w-xs')}>
      <form onSubmit={handleLogin} className='pt-4' noValidate>
        <div className='mb-4'>
          <label>
            {t('AuthForms.email')}
            <input
              className={isEmailValid ? emailClass : (emailClass += ` ${styles.error}`)}
              id='email'
              type='email'
              placeholder={t('AuthForms.email')}
              value={email}
              onChange={(ev) => emailChanged(ev.target.value)}
              onBlur={validateEmail}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label>
            {t('AuthForms.password')}
            <input
              className={
                isPasswordValid ? passwordClass : (passwordClass += ` ${styles.error}`)
              }
              id='password'
              type='password'
              placeholder='*************'
              value={password}
              onChange={(ev) => passwordChanged(ev.target.value)}
              onBlur={validatePassword}
            />
            {!isPasswordValid && (
              <p className='mt-1 text-red-500 text-xs italic text-justify'>
                {t('AuthForms.atLeastPassword')}
              </p>
            )}
          </label>
        </div>
        <div className='flex appearance-none items-center justify-between mb-4'>
          <Link to='/forgot' className='text-xs'>
            {t('AuthForms.forgot')}
          </Link>
        </div>

        <div className='w-full flex items-center justify-between flex-wrap'>
          <button
            type='submit'
            className='break-all lg:w-4/12 md:w-full font-bold rounded py-1 text-center mr-2 mb-2 border border-transparent text-secondary bg-primary shadow uppercase'
          >
            {t('AuthForms.login')}
          </button>
          <button
            type='button'
            className='truncate lg:w-7/12 md:w-full opacity-50 hover:opacity-100 font-bold rounded py-1 text-center mb-2 border border-primary bg-transparent shadow uppercase'
            onClick={() => history.push('/registration')}
          >
            {t('AuthForms.signup')}
          </button>
        </div>
        <div className='block mt-4'>
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
