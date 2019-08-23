import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';

const SetPassword = (props: any) => {
  const { t } = useTranslation();

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div className={styles['set-password']}>
      <div
        className={`${header.jumbotron} ${header.paper} ${styles['font-paper']} mb-12 rounded flex items-end justify-between pt-6`}
      >
        <div className={`${header['jumbotron-content']} mt-12`}>
          <h2 className={`${header.title} mb-12 text-secondary`}>
            <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
              {t('Profile.changePassword.title.sub')}
            </div>
            {t('Profile.changePassword.title.main')}
          </h2>
        </div>
      </div>
      <div className={`${header.paper} rounded`}>
        <p className='mb-6'>{t('Profile.changePassword.message')}</p>
        <button
          className='bg-primary uppercase font-semibold hover:bg-teal-400 text-secondary hover:text-white py-2 px-8 border-2 border-teal-300 rounded mr-6'
          onClick={goBack}
        >
          {t('Profile.changePassword.back')}
        </button>
      </div>
    </div>
  );
};

export default withRouter(SetPassword);
