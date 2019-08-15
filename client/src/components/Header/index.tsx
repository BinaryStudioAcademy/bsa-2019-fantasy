import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import Notifications from 'components/Notifications';

import './styles.scss';

const Header = () => {
  const menuItems = [
    { name: 'Leagues', link: '/leagues' },
    { name: 'Live', link: '/live', dot: true },
    { name: 'Players', link: '/players' },
    { name: 'Transfers', link: '/transfers' },
    { name: 'Fixtures', link: '/fixtures' },
    { name: 'Team Selection', link: '/team-selection' },
  ];

  return (
    <header className='header bg-primary pb-32 text-sm text-secondary2'>
      <div className='mx-16'>
        <nav className='flex items-center py-4 '>
          <div className='flex flex-initial items-center mr-4'>
            <NavLink
              to='/dashboard'
              className='font-semibold uppercase p-1 border-solid border-b-2 border-transparent hover:text-secondary mr-12'
              activeClassName='text-secondary border-secondary'
            >
              Dashboard
            </NavLink>
            <Notifications />
          </div>
          <div
            className='flex flex-grow items-center justify-end ml-auto'
            style={{ maxWidth: '60em' }}
          >
            {menuItems.map(({ name, link, dot }) => (
              <div key={name} className='flex flex-grow items-center mx-2'>
                {dot && (
                  <FontAwesomeIcon icon={faCircle} color={'#fff'} transform='shrink-11' />
                )}
                <NavLink
                  to={link}
                  className='font-semibold uppercase p-1 border-solid border-b-2 border-transparent hover:text-secondary'
                  activeClassName='text-secondary border-secondary'
                >
                  {name}
                </NavLink>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
