import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Line as LineChart } from 'react-chartjs-2';

import TeamSelection from 'components/Gameweek/TeamSelection';
import './styles.scss';

const mockChartData = {
  labels: ['GW1', 'GW2', 'GW3', 'GW4', 'GW5', 'GW6', 'GW7'],
  datasets: [
    {
      label: 'points',
      fill: true,
      borderColor: '#1EE3CF',
      backgroundColor: 'rgba(30, 227, 207, 0.3)',
      pointHoverBackgroundColor: '#fff',
      pointHoverRadius: 7,
      data: [10, 59, 80, 81, 56, 55, 40],
    },
  ],
};

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
        <div className='w-6/12'>
          <LineChart data={mockChartData} />
        </div>
      </div>
      <div className='gameweek-history-content'>
        <div className='paper rounded mr-2'>
          <TeamSelection isGameweek />
        </div>
        <div className='paper px-8 pt-12 rounded gameweek-stats ml-2'>
          <h3 className='title text-secondary mb-1'>Current Points</h3>
          <p className='pl-3 points'>
            <span className='font-bold'>47</span> points
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameweekHistory;
