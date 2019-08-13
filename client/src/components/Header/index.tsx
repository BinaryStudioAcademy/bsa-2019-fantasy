import React from 'react';
//import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import Notifications from 'components/Notifications';

const Header = () => {
  const menuItems = [
    { name: 'Leagues', link: '/leagues' },
    { name: 'Live', link: '/live' },
    { name: 'Players', link: '/players' },
    { name: 'Transfers', link: '/transfers' },
    { name: 'Fixtures', link: '/fixtures' },
    { name: 'Team selection', link: '/team-selection' },
  ];

  return (
    <header className='bg-primary pb-32 text-sm text-secondary2'>
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
          <div className='flex flex-grow items-center justify-end ml-4'>
            {menuItems.map(({ name, link }) => (
              <div key={name} className='flex' style={{ flexBasis: '8em' }}>
                <NavLink
                  to={link}
                  className='font-semibold uppercase p-1 border-solid border-b-2 border-transparent hover:text-secondary'
                  activeClassName='text-secondary border-secondary'
                >
                  {name}
                </NavLink>
              </div>
            ))}
            <input
              className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Search'
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
