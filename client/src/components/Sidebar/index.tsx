import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
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

import './styles.scss';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { name, score } = useSelector(
    (state: RootState) => state.profile.user!,
    shallowEqual,
  );

  const [isOpened, setOpened] = useState(false);
  const toggleOpened = () => setOpened((o) => !o);
  const noPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  const menuItems = [
    {
      name: 'Status',
      icon: faStar,
      link: '/',
    },
    {
      name: 'My Team',
      icon: faFutbol,
      link: '/my-team',
    },
    {
      name: 'Statistics',
      icon: faProjectDiagram,
      link: '/players',
    },
    {
      name: 'Transfers',
      icon: faExchangeAlt,
      link: '/transfers',
    },
    {
      name: 'Leagues',
      icon: faAward,
      link: '/leagues',
    },
  ];

  return (
    <div
      className={`sidebar flex flex-col py-6 bg-secondary text-primary2 h-screen relative ${
        isOpened ? 'open' : ''
      }`}
      onClick={toggleOpened}
      role='presentation'
    >
      <Link
        to='/'
        className={`sidebar-logo item font-bold ${isOpened ? 'pl-6 pr-12' : 'pl-3 pr-3'}`}
      >
        <img
          src='/images/logo.png'
          alt='logo'
        />
      </Link>
      <Link
        className={`username-link mt-32 flex-col ${isOpened ? 'pl-6' : 'pl-3'}`}
        to='/profile'
        onClick={noPropagation}
      >
        <img
          src='https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png'
          alt='user'
          style={{ height: 45, width: 45 }}
          className='rounded-full mb-2'
        />
        <p className={`username ${isOpened ? 'open' : ''}`}>{name}</p>
      </Link>
      <div className={`points text-sm ${isOpened ? 'pl-6' : 'pl-4'}`}>Score: {score}</div>
      <div className='menu mt-16'>
        {menuItems.map(({ name, icon, link }) => (
          <NavLink
            exact
            className='menuItem flex px-6 py-5 h-8 justify-start items-center hover:text-primary'
            activeClassName='text-primary'
            key={name}
            to={link}
            onClick={noPropagation}
          >
            <FontAwesomeIcon className='fa-fw' icon={icon} />
            <div className='link-title'>{name}</div>
          </NavLink>
        ))}
        <button
          type='button'
          className='absolute bottom-0 mb-6 w-full opacity-75 hover:opacity-100 font-bold rounded py-1 px-6 bg-transparent uppercase'
          onClick={(e) => {
            e.stopPropagation();
            dispatch(logout());
          }}
        >
          {isOpened ? 'Logout' : <FaSignOutAlt className='ml-1 opacity-75' />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
