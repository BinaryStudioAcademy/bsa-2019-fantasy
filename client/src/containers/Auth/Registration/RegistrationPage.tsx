import React, { useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import RegistrationForm from 'components/AuthForms/RegistrationForm';

import styles from '../styles.module.scss';

const RegistrationPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Sign Up | Fantasy Football League';
  }, []);

  return (
    <div
      className={cn(
        styles['login-container'],
        'flex w-full md:flex-row-reverse flex-wrap',
      )}
    >
      <div className={styles.layer} />
      <div className='w-full h-full flex-col items-center justify-center md:w-3/4 min-h-screen'>
        <div
          className={cn(
            styles['lable-wrapper'],
            'min-h-screen',
            'flex',
            'flex-col',
            'justify-center',
          )}
        >
          <h1 className={cn(styles['main-lable'], 'w-full')}>
            {t('RegistrationPage.register')}
          </h1>
          <h1 className={cn(styles['main-lable'], 'w-full')}>
            {t('RegistrationPage.fantasy')}
          </h1>
        </div>
      </div>
      <div
        className={cn(
          styles['form-container'],
          'w-full h-full md:w-1/4 p-6 lg:p-10 min-h-screen flex flex-col justify-center',
        )}
      >
        <div className={cn(styles.lables, 'mb-6')}>
          <h2 className={cn(styles['side-lable'], 'leading-tight', 'mb-2')}>
            {t('RegistrationPage.welcome')}
          </h2>
          <h3 className={cn(styles['side-lable'], styles['side-lable-small'])}>
            {t('RegistrationPage.fill-the-form')}
          </h3>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
