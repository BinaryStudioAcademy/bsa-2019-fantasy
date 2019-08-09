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
  ];

  return (
    <header className='bg-primary pb-32 text-sm text-secondary2'>
      <div className='mx-16'>
        <nav className='flex items-center flex-wrap py-4 '>
          <div className='flex items-center'>
            <a href='/dashboard' className='block hover:text-white mr-12'>
              Dashboard
            </a>
            <Notifications />
          </div>
          <div className='flex items-center ml-auto'>
            {menuItems.map(({ name, link }) => (
              <div key={name}>
                <NavLink
                  to={link}
                  className='block hover:text-white mr-20'
                  activeClassName='text-white'
                >
                  {name}
                </NavLink>
              </div>
            ))}
          </div>
          <div className='flex'>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
