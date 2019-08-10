import React from 'react';
//import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import Notifications from 'components/Notifications';

const Header = () => (
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
          <NavLink to='/leagues' className='block hover:text-white mr-20'>
            Leagues
          </NavLink>
          <NavLink to='/live' className='block hover:text-white mr-20'>
            Live
          </NavLink>
          <NavLink to='/players' className='block hover:text-white mr-20'>
            Players
          </NavLink>
          <NavLink to='/transfers' className='block hover:text-white mr-20'>
            Transfers
          </NavLink>
          <NavLink to='/fixtures' className='block hover:text-white mr-20'>
            Fixtures
          </NavLink>
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

export default Header;
