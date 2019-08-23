import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faFutbol,
  faProjectDiagram,
  faExchangeAlt,
  faAward,
} from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'store/types';

import { logout } from 'containers/Profile/actions';

import styles from './styles.module.scss';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { name, score, money, team_name } = useSelector(
    (state: RootState) => state.profile.user!,
    shallowEqual,
  );

  const [isOpened, setOpened] = useState(false);
  const toggleOpened = () => setOpened((o) => !o);
  const noPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  const menuItems = team_name
    ? [
        {
          name: t('Sidebar.status'),
          icon: faStar,
          link: '/',
        },
        {
          name: t('Sidebar.myTeam'),
          icon: faFutbol,
          link: '/my-team',
        },
        {
          name: t('Sidebar.statistics'),
          icon: faProjectDiagram,
          link: '/players',
        },
        {
          name: t('Sidebar.transfers'),
          icon: faExchangeAlt,
          link: '/transfers',
        },
        {
          name: t('Sidebar.leagues'),
          icon: faAward,
          link: '/leagues',
        },
      ]
    : [];

  return (
    <div
      className={`${
        styles.sidebar
      } flex flex-col justify-between py-6 bg-secondary text-primary2 h-screen relative ${
        isOpened ? styles.open : ''
      }`}
      onClick={toggleOpened}
      role='presentation'
    >
      <Link
        to='/'
        className={`sidebar-logo ${styles['sidebar-logo']} ${isOpened ? 'pl-6' : 'pl-3'}`}
      >
        <img src='/images/logo.png' alt='logo' style={{ height: 45, width: 45 }} />
      </Link>

      <div
        className={`profile-menu ${styles['profile-menu']} ${isOpened ? 'pl-6' : 'pl-3'}`}
      >
        <Link className={`mt-32 flex-col`} to='/profile' onClick={noPropagation}>
          <img
            src='https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png'
            alt='user'
            style={{ height: 45, width: 45 }}
            className='rounded-full mb-2'
          />
          <p className={`${styles.username} truncate ${isOpened ? styles.open : ''}`}>
            {name}
          </p>
        </Link>
        <div className={`${styles.points} text-sm`}>
          {t('Sidebar.money')}: £{money}
        </div>
        <div className={`${styles.points} text-sm`}>
          {t('Sidebar.score')}: {score}
        </div>
      </div>

      <div className='navigation-menu'>
        {menuItems.map(({ name, icon, link }) => (
          <NavLink
            exact
            className='flex px-6 py-5 h-8 justify-start items-center hover:text-primary'
            activeClassName='text-primary'
            key={`sidebar-menu-${name}`}
            to={link}
            onClick={noPropagation}
          >
            <FontAwesomeIcon className='fa-fw' icon={icon} />
            <div className={styles['link-title']}>{name}</div>
          </NavLink>
        ))}
      </div>

      <div className='logout-btn px-6'>
        <button
          type='button'
          className='w-full hover:text-primary font-bold bg-transparent uppercase'
          onClick={(e) => {
            e.stopPropagation();
            dispatch(logout());
          }}
        >
          {isOpened ? t('Sidebar.logout') : <FaSignOutAlt className='ml-1' />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
