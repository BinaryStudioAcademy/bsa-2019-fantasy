import React from 'react';
import Chart from 'chart.js';

import { Radar } from 'react-chartjs-2';
import { PlayerType } from 'types/player.types';
import { RootState } from 'store/types';
import { Club } from 'types/club.type';
import { useSelector } from 'react-redux';
import { getClubLogoUrl, getPlayerImageUrl } from 'helpers/images';
import Button from 'components/Button';

Object.assign(Chart.defaults.global, {
  defaultFontFamily: 'Source Sans Pro',
  defaultFontStyle: 'normal',
  defaultFontColor: '#7d8891',
});

type Props = {
  comparisonData: PlayerType[];
};

const PlayersHighlights = (props: Props) => {
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

  const firstPlayer = props.comparisonData[0];
  const secondPlayer = props.comparisonData[1];

  const firstPlayerAlltimeDataset = [
    firstPlayer.goals,
    firstPlayer.assists,
    firstPlayer.missed_passes,
    firstPlayer.goals_conceded,
    firstPlayer.saves,
    firstPlayer.yellow_cards,
    firstPlayer.red_cards,
  ];

  const secondPlayerAlltimeDataset = [
    secondPlayer.goals,
    secondPlayer.assists,
    secondPlayer.missed_passes,
    secondPlayer.goals_conceded,
    secondPlayer.saves,
    secondPlayer.yellow_cards,
    secondPlayer.red_cards,
  ];

  const positionDict = {
    GKP: {
      name: 'goalkeeper',
    },
    DEF: {
      name: 'defender',
    },
    MID: {
      name: 'midfielder',
    },
    FWD: {
      name: 'forward',
    },
  };

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
        label: firstPlayer.first_name + ' ' + firstPlayer.second_name,
        data: firstPlayerAlltimeDataset,
        backgroundColor: 'rgba(30, 227, 207, .5)',
        borderColor: 'rgba(30, 227, 207, .5)',
        pointBackgroundColor: 'rgba(30, 227, 207, 1)',
        pointBorderWidth: 1,
        pointRadius: 3,
      },
      {
        label: secondPlayer.first_name + ' ' + secondPlayer.second_name,
        data: secondPlayerAlltimeDataset,
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

  const eventTypes = [
    'goals',
    'assists',
    'missed_passes',
    'goals_conceded',
    'saves',
    'yellow_cards',
    'red_cards',
  ];

  const getAverageSeasonValue = (playerGameweeks: any, eventType: string) => {
    let seasonCounter = 0;

    playerGameweeks.forEach(
      (gameweek: any) => (seasonCounter += gameweek.stats[eventType]),
    );

    const averageValue = parseFloat((seasonCounter / playerGameweeks.length).toFixed(2));

    return averageValue;
  };

  const firstPlayerSeasonDataset = eventTypes.map((eventType) =>
    getAverageSeasonValue(firstPlayer.gameweeks_stats, eventType),
  );

  const secondPlayerSeasonDataset = eventTypes.map((eventType) =>
    getAverageSeasonValue(secondPlayer.gameweeks_stats, eventType),
  );

  return (
    <section className='players-highlights bg-white shadow-figma rounded-sm p-8 text-secondary'>
      <div className='players-wrapper flex justify-between'>
        <div className='player-first flex flex-col items-start text-left'>
          <div className='player-club-logo rounded-full shadow-figma p-4 mb-8'>
            <img
              className='w-8'
              src={getClubLogoUrl(getClubCodeById(firstPlayer.club_id)!, 80)}
              alt=''
            />
          </div>

          <div className='player-league font-bold text-secondary2 mb-8 uppercase'>
            {positionDict[firstPlayer.position].name}
          </div>

          <div className='player-main-first-name'>
            <h2 className='font-bold text-2xl xl:text-2xl leading-none'>
              {firstPlayer.first_name}
            </h2>
          </div>

          <div className='player-main-second-name'>
            <h2 className='font-bold text-3xl xl:text-4xl leading-none'>
              {firstPlayer.second_name}
            </h2>
          </div>

          <div className='club-name mb-8'>
            <h3 className='text-secondary2 text-3xl xl:text-4xl'>
              {getClubNameById(firstPlayer.club_id)}
            </h3>
          </div>

          <div className='player-points'>
            <div className='player-points-logo flex justify-between mb-4'>
              <div className='rectangle-1 w-10 h-1 mr-1 rounded-sm bg-primary' />{' '}
              <div className='rectangle-2 w-10 h-1 mr-1 rounded-sm bg-teal-200' />
              <div className='rectangle-3 w-10 h-1 mr-1 rounded-sm bg-teal-100' />
            </div>
            <div className='player-points-counter font-bold mb-8 uppercase'>
              {firstPlayer.player_price + ' pts'}
            </div>
          </div>

          <div className='player-photo px-0 xl:px-8 pt-4 -mb-8'>
            <img
              style={{ maxHeight: '22em' }}
              src={getPlayerImageUrl(firstPlayer.code, 500)}
              alt=''
            />
          </div>
        </div>

        <div className='players-chart-navigation flex flex-col self-center w-2/5'>
          <div className='players-chart'>
            <Radar data={chartData} options={chartOptions} />
          </div>

          <div className='players-navigation-avg flex flex-col items-center mt-8 p-5 rounded-lg shadow-figma'>
            <div className='players-navigation-avg-title uppercase font-bold text-lg tracking-widest'>
              Average Stats per Match
            </div>
            <div className='players-navigation-avg-sub text-xs text-secondary2 tracking-widest'>
              (current season)
            </div>
            <div className='players-navigation-avg-table flex text-xs uppercase mt-4'>
              <div className='flex flex-col'>
                {firstPlayerSeasonDataset.map((field, index) => (
                  <div
                    key={index}
                    className={`${
                      /* [0, 1, 4] are positive events indexes (goals, assists, saves) */
                      [0, 1, 4].includes(index)
                        ? field > secondPlayerSeasonDataset[index]
                          ? 'font-bold'
                          : ''
                        : field < secondPlayerSeasonDataset[index]
                        ? 'font-bold'
                        : ''
                    }`}
                  >
                    {field}
                  </div>
                ))}
              </div>

              <div className='flex flex-col items-center font-semibold mx-12'>
                <div>Goals</div>
                <div>Assists</div>
                <div>Misses Passes</div>
                <div>Goals Conceded</div>
                <div>Saves</div>
                <div>Yellow Cards</div>
                <div>Red Cards</div>
              </div>

              <div className='flex flex-col'>
                {secondPlayerSeasonDataset.map((field, index) => (
                  <div
                    key={index}
                    className={`${
                      [0, 1, 4].includes(index)
                        ? field > firstPlayerSeasonDataset[index]
                          ? 'font-bold'
                          : ''
                        : field < firstPlayerSeasonDataset[index]
                        ? 'font-bold'
                        : ''
                    }`}
                  >
                    {field}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='players-btns self-center mt-8'>
            {' '}
            <Button
              href='/players'
              type='link'
              styling='secondary'
              className='text-sm xl:text-base'
            >
              Go back
            </Button>
          </div>
        </div>

        <div className='player-second flex flex-col items-end text-right'>
          <div className='player-club-logo rounded-full shadow-figma p-4 mb-8'>
            <img
              className='w-8'
              src={getClubLogoUrl(getClubCodeById(secondPlayer.club_id)!, 80)}
              alt=''
            />
          </div>

          <div className='player-league font-bold text-secondary2 mb-8 uppercase'>
            {positionDict[secondPlayer.position].name}
          </div>

          <div className='player-main-first-name'>
            <h2 className='font-bold text-2xl xl:text-2xl leading-none'>
              {secondPlayer.first_name}
            </h2>
          </div>

          <div className='player-main-second-name'>
            <h2 className='font-bold text-3xl xl:text-4xl leading-none'>
              {secondPlayer.second_name}
            </h2>
          </div>

          <div className='club-name mb-8'>
            <h3 className='text-secondary2 text-3xl xl:text-4xl'>
              {getClubNameById(secondPlayer.club_id)}
            </h3>
          </div>

          <div className='player-points'>
            <div className='player-points-logo flex justify-between mb-4'>
              <div className='rectangle-1 w-10 h-1 mr-1 rounded-sm bg-primary' />{' '}
              <div className='rectangle-2 w-10 h-1 mr-1 rounded-sm bg-teal-200' />
              <div className='rectangle-3 w-10 h-1 mr-1 rounded-sm bg-teal-100' />
            </div>
            <div className='player-points-counter font-bold mb-8 uppercase'>
              {secondPlayer.player_price + ' pts'}
            </div>
          </div>

          <div className='player-photo px-0 xl:px-8 pt-4 -mb-8'>
            <img
              style={{ maxHeight: '22em' }}
              src={getPlayerImageUrl(secondPlayer.code, 500)}
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayersHighlights;
