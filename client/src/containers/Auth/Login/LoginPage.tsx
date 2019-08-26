import React, { useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import LoginForm from 'components/AuthForms/LoginForm';

import styles from '../styles.module.scss';

const LoginPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Sign In | Fantasy Football League';
  }, []);

  return (
    <div
      className={cn(
        styles['login-container'],
        'flex w-full h-full flex-row-reverse flex-wrap',
      )}
    >
      <div className={styles.layer} />
      <div className='w-full h-full flex-col items-center justify-center md:w-3/4'>
        <div className={styles['lable-wrapper']}>
          <h1 className={cn(styles['main-lable'], 'w-full')}>{t('LoginPage.login')}</h1>
          <h1 className={cn(styles['main-lable'], 'w-full')}>{t('LoginPage.fantasy')}</h1>
        </div>
      </div>
      <div className={cn(styles['login-form'], 'w-auto h-full  md:w-1/4 p-6')}>
        <div className={cn(styles.lables, 'pl-8 mt-48 mb-6')}>
          <h2 className={styles['side-lable']}>{t('LoginPage.hey')}</h2>
          <h3 className={cn(styles['side-lable'], styles['side-lable-small'])}>
            {t('LoginPage.welcome')}
          </h3>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
