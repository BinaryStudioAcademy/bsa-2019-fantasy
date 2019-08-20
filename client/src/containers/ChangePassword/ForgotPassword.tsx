import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import ForgotPasswordForm from 'components/ChangePasswordForms/ForgotPasswordForm';

import styles from '../Auth/styles.module.scss';

const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        styles['login-container'],
        'flex w-full h-full md:flex-row-reverse flex-wrap',
      )}
    >
      <div className={styles.layer} />
      <div className='w-full h-full flex-col items-center justify-center md:w-3/4 '>
        <div className={styles['lable-wrapper']}>
          <h1 className={cn(styles['main-lable'], 'w-full')}>
            {t('ChangePasswordPage.forgotPassword')}
          </h1>
        </div>
      </div>
      <div className={cn(styles['login-form'], 'w-full h-full md:w-1/4 p-6')}>
        <div className={cn(styles.lables, 'pl-10 mt-48 mb-6')}>
          <h2 className={styles['side-lable']}>{t('ChangePasswordPage.title')}</h2>
          <h3 className={cn(styles['side-lable'], styles['side-lable-small'])}>
            {t('ChangePasswordPage.subtitle.forgotPassword')}
          </h3>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
