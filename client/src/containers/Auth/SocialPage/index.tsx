import React, { useEffect } from 'react';

import SocialForm from 'components/AuthForms/SocialForm';

import styles from '../styles.module.scss';

const SocialPage = () => {
  useEffect(() => {
    document.title = 'Social Page | Fantasy Football League';
  }, []);

  return (
    <div
      className={`flex w-full md:flex-row-reverse flex-wrap ${styles['login-container']}`}
    >
      <div className={styles.layer} />
      <div className='w-full h-full flex-col items-center justify-center md:w-3/4 '>
        <div className={styles['lable-wrapper']}>
          <h1 className={`${styles['main-lable']} w-full`}>Social network account</h1>
          <h1 className={`${styles['main-lable']} w-full`}>Fantasy Premier League</h1>
        </div>
      </div>
      <div className={`w-full h-full md:w-1/4 ${styles['form-container']} p-6`}>
        <div className={`${styles.lables} pl-8 mt-40 mb-6`}>
          <h2 className={styles['side-lable']}>New social network account</h2>
          <h3 className={`${styles['side-lable']} ${styles['side-lable-small']}`}>
            You&apos;re logging in with a new social network account
          </h3>
        </div>
        <SocialForm />
      </div>
    </div>
  );
};

export default SocialPage;
