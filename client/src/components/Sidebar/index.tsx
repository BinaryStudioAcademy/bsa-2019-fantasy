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
      className='flex flex-col items-center py-10 bg-secondary text-primary2 h-screen'
      onClick={toggleOpened}
    >
      <div className='item'>Logo</div>
      <Link className='mt-32' to='/profile' onClick={noPropagation}>
        Avatar
        {isOpened && <>User</>}
      </Link>
      <div>Points</div>
      <div className='menu mt-16'>
        {menuItems.map(({ name, icon, link }) => (
          <NavLink
            exact
            className='menuItem flex px-4 py-5 h-8 justify-start items-center hover:text-primary'
            activeClassName='text-primary'
            key={name}
            to={link}
            onClick={noPropagation}
          >
            <FontAwesomeIcon className='fa-fw' icon={icon} />
            {isOpened && <div className='ml-4'>{name}</div>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
