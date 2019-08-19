import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js';

import Button from 'components/Button';
import { getClubLogoUrl, getPlayerImageUrl } from 'helpers/images';
import { RootState } from 'store/types';

import './styles.scss';
import { Player } from 'types/player.types';
import { Club } from 'types/club.types';

// default chart values
Object.assign(Chart.defaults.global, {
  defaultFontFamily: 'Source Sans Pro',
  defaultFontStyle: 'normal',
  defaultFontColor: '#7d8891',
  // fontSize is set inside component parameters (chartData)
});

const PlayerHighlight = ({ player }: { player: Player }) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const getClubById = (id: number) => {
    return clubs.find((club: Club) => club.id === id);
  };
  const getClubNameById = (id: number) => {
    const club = getClubById(id);
    return club && club.name;
  };

  const getClubCodeById = (id: number) => {
    const club = getClubById(id);
    return club && club.code;
  };

  const {
    goals,
    assists,
    missed_passes,
    goals_conceded,
    saves,
    yellow_cards,
    red_cards,
    club_id,
  } = player;
  const dataset = [
    goals,
    assists,
    missed_passes,
    goals_conceded,
    saves,
    yellow_cards,
    red_cards,
  ];

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
        label: player.first_name + ' ' + player.second_name,
        data: dataset,
        backgroundColor: 'rgba(30, 227, 207, .5)',
        borderColor: 'rgba(30, 227, 207, .5)',
        pointBackgroundColor: 'rgb(30, 227, 207)',
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
    tooltips: {
      intersect: false,
      enabled: true,
      callbacks: {
        label: function(tooltipItem: any, data: any) {
          return (
            data.datasets[tooltipItem.datasetIndex].label +
            ' : ' +
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
          );
        },
      },
    },
  };

  return (
    <section className='playerHighlight flex bg-white shadow-figma rounded-sm p-8  text-secondary'>
      <div
        className='playerInfo flex flex-col flex-shrink-0 items-start p-4'
        style={{ maxWidth: '25%', height: '490px' }}
      >
        <div className='clubLogo rounded-full shadow-figma p-4'>
          <img
            className='w-16'
            src={getClubLogoUrl(getClubCodeById(club_id)!, 80)}
            alt='Club logo'
          />
        </div>

        <div className='award text-secondary2 mt-12'>
          <FontAwesomeIcon icon={faMedal} /> Player of the week
        </div>

        <h2
          className='playerName font-bold text-3xl xl:text-5xl mt-4 leading-none'
          style={{ maxHeight: '2em', width: '400px' }}
        >
          {player.first_name} {player.second_name}
        </h2>
        <h3 className='clubName text-secondary2 text-3xl xl:text-5xl'>
          {getClubNameById(club_id)}
        </h3>

        <div className='actions mt-auto'>
          <Button
            href='/history'
            type='link'
            styling='primary'
            className='text-sm xl:text-base mr-4'
          >
            History
          </Button>
          <Button
            href='/fixtures'
            type='link'
            styling='secondary'
            className='text-sm xl:text-base'
          >
            Fixtures
          </Button>
        </div>

        <div className='allWinners mt-6 text-sm'>
          <Link className='font-semibold hover:underline' to='/'>
            Browse all winners
          </Link>
        </div>
      </div>

      <div className='playerPhoto flex items-end px-0 xl:px-8 pt-4 -mb-8'>
        <img
          style={{ maxHeight: '28em' }}
          src={getPlayerImageUrl(player.code, 500)}
          alt='playerPhoto'
        />
      </div>

      <div
        className='statsChart flex flex-auto flex-col justify-center p-0 xl:p-4 xl:border-l border-greyBorder'
        style={{ maxWidth: '40%' }}
      >
        <div className='px-4'>
          <h4 className='font-bold text-xl'>Summary</h4>
          <p className='font-semibold text-xs'>Season 1</p>
        </div>

        <div className='chart-container'>
          <Radar data={chartData} options={chartOptions} />
        </div>
      </div>
    </section>
  );
};

export default PlayerHighlight;
