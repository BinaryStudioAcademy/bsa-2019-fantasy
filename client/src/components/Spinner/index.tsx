import React from 'react';

import styles from './styles.module.scss';

const Spinner = () => {
  return (
    <div className={styles.box}>
      <div className={styles.shadow} />
      <div className={styles.gravity}>
        <div className={styles.ball} />
      </div>
    </div>
  );
};

export default Spinner;
