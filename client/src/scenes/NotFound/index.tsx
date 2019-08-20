import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notfound}>
      <div className='container'>
        <div className={styles.jumbotron}>
          <div className={styles['jumbotron-title']}>
            <span>4</span>
            <div className={styles['ball-wrapper']}>
              <div className={styles.ball} />
              <div className={styles['ball-shadow']} />
            </div>
            <span>4</span>
          </div>
          <div className={styles['jumbotron-content']}>
            <p className='mb-4'>{t('NotFound.message')}</p>
            <Link
              to='/'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              {t('NotFound.back')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
