import React from 'react';
import { Link } from 'react-router-dom';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import TeamSelection from 'components/Gameweek/TeamSelection';

import './styles.scss';

const GameweekHistory = () => {
  return (
    <div className='gameweek-history'>
      <div className='jumbotron paper mb-12 rounded flex items-end justify-between pt-6'>
        <div className='jumbotron-content mt-32 mb-12'>
          <h2 className='title text-secondary mb-12'>
            <div className='sub title mb-3 flex items-center'>Premier League</div>
            Gameweek 1
          </h2>
          <Link
            to='/'
            className='g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded mr-6'
          >
            <FaChevronLeft /> Previous
          </Link>
          <Link
            to='/'
            className='g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded'
          >
            Next <FaChevronRight />
          </Link>
        </div>
      </div>
      <div className='paper'>
        <TeamSelection />
      </div>
    </div>
  );
};

export default GameweekHistory;
