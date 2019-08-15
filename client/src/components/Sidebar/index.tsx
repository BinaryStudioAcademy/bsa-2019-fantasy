import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faFutbol,
  faProjectDiagram,
  faExchangeAlt,
  faAward,
} from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const Sidebar = () => {
  const [isOpened, setOpened] = useState(false);
  const toggleOpened = () => setOpened(!isOpened);
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
      className={`sidebar flex flex-col py-8 bg-secondary text-primary2 h-screen ${
        isOpened ? 'open' : ''
      }`}
      onClick={toggleOpened}
    >
      <Link
        to='/'
        className={`sidebar-logo item font-bold ${isOpened ? 'pl-6' : 'pl-4'}`}
      >
        Logo
      </Link>
      <Link
        className={`username-link mt-32 flex-col ${isOpened ? 'pl-6' : 'pl-3'}`}
        to='/profile'
        onClick={noPropagation}
      >
        <img
          src='https://via.placeholder.com/50'
          alt='user'
          style={{ height: 45, width: 45 }}
          className='rounded-full mb-2'
        />
        <p className={`username ${isOpened ? 'open' : ''}`}>John Doe</p>
      </Link>
      <div className={`points ${isOpened ? 'pl-6' : 'pl-4'}`}>Points</div>
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
      </div>
    </div>
  );
};

export default Sidebar;
