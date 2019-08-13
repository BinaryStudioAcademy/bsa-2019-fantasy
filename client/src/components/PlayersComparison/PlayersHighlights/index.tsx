import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js';

Object.assign(Chart.defaults.global, {
  defaultFontFamily: 'Source Sans Pro',
  defaultFontStyle: 'normal',
  defaultFontColor: '#7d8891',
  // fontSize is set inside component parameters (chartData)
});

const PlayersHighlights = () => {
  const chartData = {
    labels: [
      'Goals',
      'Assists',
      'Missed passes',
      'Goals conceded',
      'Saves',
      'Yellow cards',
      'Red cards',
    ],
    datasets: [
      {
        data: [3, 6, 4, 3, 2, 4, 6],
        backgroundColor: 'rgba(30, 227, 207, .5)',
        borderColor: 'rgba(30, 227, 207, .5)',
        pointBackgroundColor: 'rgba(30, 227, 207, 1)',
        pointBorderWidth: 1,
        pointRadius: 3,
      },
      {
        data: [2, 1, 4, 5, 6, 4, 3],
        backgroundColor: 'rgba(237, 100, 166, .5)',
        borderColor: 'rgba(237, 100, 166, .5)',
        pointBackgroundColor: 'rgba(237, 100, 166, 1)',
        pointBorderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    scale: {
      angleLines: {
        display: false,
      },
      gridLines: {
        color: 'rgba(18, 39, 55, 0.11)',
        lineWidth: 1,
      },
      ticks: {
        display: false,
        beginAtZero: true,
        min: 0,
        stepSize: 1,
      },
      pointLabels: {
        fontSize: '14',
      },
    },
  };

  return (
    <section className='players-highlights bg-white shadow rounded-sm p-8 text-secondary'>
      <div className='players-wrapper flex justify-between'>
        <div className='player-first flex flex-col items-start text-left'>
          <div className='player-club-logo rounded-full shadow p-4 mb-8'>
            <img className='w-8' src='/images/club-logos/badge_6_80.png' alt='' />
          </div>

          <div className='player-league font-bold text-secondary2 mb-8'>
            <FontAwesomeIcon icon={faStar} /> Premier league
          </div>

          <div className='player-main-name'>
            <h2 className='font-bold text-3xl xl:text-4xl leading-none'>Lucas Digne</h2>
          </div>

          <div className='club-name mb-8'>
            <h3 className='text-secondary2 text-3xl xl:text-4xl'>Liverpool</h3>
          </div>

          <div className='player-points'>
            <div className='player-points-logo flex justify-between mb-4'>
              <div className='rectangle-1 w-10 h-1 mr-1 rounded-sm bg-primary' />{' '}
              <div className='rectangle-2 w-10 h-1 mr-1 rounded-sm bg-teal-200' />
              <div className='rectangle-3 w-10 h-1 mr-1 rounded-sm bg-teal-100' />
            </div>
            <div className='player-points-counter'>1234 points</div>
          </div>

          <div className='player-photo px-0 xl:px-8 pt-4 -mb-8'>
            <img
              style={{ maxHeight: '22em' }}
              src='/images/players/500x500/101188.png'
              alt=''
            />
          </div>
        </div>

        <div className='players-chart self-center w-2/5'>
          <Radar data={chartData} options={chartOptions} />
        </div>

        <div className='player-second flex flex-col items-end text-right'>
          <div className='player-club-logo rounded-full shadow p-4 mb-8'>
            <img className='w-8' src='/images/club-logos/badge_6_80.png' alt='' />
          </div>

          <div className='player-league font-bold text-secondary2 mb-8'>
            <FontAwesomeIcon icon={faStar} /> Premier league
          </div>

          <div className='player-main-name'>
            <h2 className='font-bold text-3xl xl:text-4xl leading-none'>
              Mario Balotelli
            </h2>
          </div>

          <div className='club-name mb-8'>
            <h3 className='text-secondary2 text-3xl xl:text-4xl'>Barcelona</h3>
          </div>

          <div className='player-points'>
            <div className='player-points-logo flex justify-between mb-4'>
              <div className='rectangle-1 w-10 h-1 mr-1 rounded-sm bg-pink-500' />{' '}
              <div className='rectangle-2 w-10 h-1 mr-1 rounded-sm bg-pink-200' />
              <div className='rectangle-3 w-10 h-1 mr-1 rounded-sm bg-pink-100' />
            </div>
            <div className='player-points-counter'>1234 points</div>
          </div>

          <div className='player-photo px-0 xl:px-8 pt-4 -mb-8'>
            <img
              style={{ maxHeight: '22em' }}
              src='/images/players/500x500/15749.png'
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayersHighlights;
