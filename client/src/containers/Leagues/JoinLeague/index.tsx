import React from 'react';

import { FaStar } from 'react-icons/fa';

import PrivateLeagues from './PrivateLeagues';
import PublicLeagues from './PublicLeagues';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';

const JoinLeague = () => (
  <div className={styles['join-league']}>
    <div className='container'>
      <div className={`${header.jumbotron} ${header.paper} mb-12 rounded`}>
        <div className={`${header['jumbotron-content']} mt-12`}>
          <h2 className={`${header.title} text-secondary`}>
            <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
              <FaStar />
              Join a League
            </div>
            Join an existing league
          </h2>
        </div>
      </div>
      <div
        className={`${styles['join-league-content']} ${styles.paper} flex flex-col md:flex-row rounded`}
      >
        <PublicLeagues />
        <PrivateLeagues />
      </div>
    </div>
  </div>
);

export default JoinLeague;
