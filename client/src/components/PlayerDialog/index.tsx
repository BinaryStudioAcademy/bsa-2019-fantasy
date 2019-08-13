import React, { useState } from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames';

import './styles.module.scss';

type Props = {
  id: string;
  onDismiss: () => void;
};

const PlayerDialog = (props: Props) => {
  const data = [
    {
      name: 'GW1',
      games: [
        {
          opponent: 'CHE',
          res: '4 - 0',
          stat: {
            firstName: 'David',
            secondName: 'de Gea',
            position: 'goalkeeper',
            club: 'Arsenal',
            playerPrice: 10,
            playerScore: 10,

            goals: 0,
            assists: 0,
            missedPasess: 0,
            goalsConceded: 0,
            saves: 7,
            yellowCards: 0,
            redCards: 0,
          },
        },
        {
          opponent: 'WHU',
          res: '0 - 5',
          stat: {
            firstName: 'David',
            secondName: 'de Gea',
            position: 'goalkeeper',
            club: 'Arsenal',
            playerPrice: 13,
            playerScore: 13,

            goals: 0,
            assists: 0,
            missedPasess: 0,
            goalsConceded: 0,
            saves: 5,
            yellowCards: 0,
            redCards: 0,
          },
        },
      ],
    },
    {
      name: 'GW2',
      games: [
        {
          opponent: 'SOU',
          res: '1 - 0',
          stat: {
            firstName: 'David',
            secondName: 'de Gea',
            position: 'goalkeeper',
            club: 'Arsenal',
            playerPrice: 14,
            playerScore: 14,

            goals: 0,
            assists: 0,
            missedPasess: 0,
            goalsConceded: 0,
            saves: 3,
            yellowCards: 0,
            redCards: 0,
          },
        },
        {
          opponent: 'ARS',
          res: '0 - 2',
          stat: {
            firstName: 'David',
            secondName: 'de Gea',
            position: 'goalkeeper',
            club: 'Arsenal',
            playerPrice: 12,
            playerScore: 13,

            goals: 0,
            assists: 1,
            missedPasess: 0,
            goalsConceded: 0,
            saves: 2,
            yellowCards: 0,
            redCards: 0,
          },
        },
      ],
    },
  ];

  const fixtures = [
    {
      date: 'Sat 17 Aug 19:30',
      round: 2,
      opponent: 'TOT',
      FDR: 4,
    },
    {
      date: 'Sat 17 Aug 19:30',
      round: 2,
      opponent: 'BOU',
      FDR: 1,
    },
    {
      date: 'Sat 17 Aug 19:30',
      round: 2,
      opponent: 'BHA',
      FDR: 4,
    },
    {
      date: 'Sat 17 Aug 19:30',
      round: 2,
      opponent: 'NOR',
      FDR: 3,
    },
    {
      date: 'Sat 17 Aug 19:30',
      round: 2,
      opponent: 'WAT',
      FDR: 2,
    },
    {
      date: 'Sat 17 Aug 19:30',
      round: 2,
      opponent: 'EVE',
      FDR: 1,
    },
  ];

  const player = data[0].games[0].stat;

  const backgroundColors: { [key: string]: string } = {
    goalkeeper: 'bg-yellow-400',
    defender: 'bg-green-600',
    midfielder: 'bg-real-400',
    forward: 'bg-red-600',
  };

  const [currentTab, setCurrentTab] = useState('history');

  const renderHeader = (row: any[]) =>
    row.map((obj, i) => {
      const string = Object.keys(obj)[0]
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase();
      return (
        <div key={i} className='w-1/12 bg-gray-400 text-center '>
          <abbr title={string}>
            {string
              .split(' ')
              .map((w) => w.charAt(0))
              .join('')
              .toUpperCase()}
          </abbr>
        </div>
      );
    });

  const generateRows = () => {
    const result: (string | number)[][] = [];
    data.map(({ name, games }) => {
      return games.map(({ opponent, res, stat }) => {
        const row: any[] = [{ name }, { opponent }, { res }];
        for (let [key, value] of Object.entries(stat)) {
          if (typeof value === 'string') continue;
          row.push({ [`${key}`]: value });
        }
        return result.push(row);
      });
    });
    return result;
  };

  const rows = generateRows();

  const renderTableRows = () =>
    rows.map((row, i) => (
      <div key={i} className='flex'>
        {row.map((obj) => {
          const value = Object.values(obj)[0];
          return (
            <div key={value} className='w-1/12 text-center'>
              {value}
            </div>
          );
        })}
      </div>
    ));

  const renderHistory = () => (
    <div className='self-center' style={{ width: '90%' }}>
      <h3 className='text-lg font-medium'>This season</h3>
      <div className='flex text-sm mt-4'>{renderHeader(rows[0])}</div>
      {renderTableRows()}
    </div>
  );

  const createFixtures = () =>
    fixtures.map(({ date, round, opponent, FDR }) => (
      <div key={date + round} className='flex'>
        <div className='w-5/12 cell'>{date}</div>
        <div className='w-3/12 cell'>{round}</div>
        <div className='w-3/12 cell'>{opponent}</div>
        <div className='w-1/12 cell'>{FDR}</div>
      </div>
    ));

  const renderFixtures = () => (
    <div className='self-center' style={{ width: '90%' }}>
      <div className='flex'>
        <div className='w-5/12 bg-gray-400'>Date</div>
        <div className='w-3/12 bg-gray-400'>Round</div>
        <div className='w-3/12 bg-gray-400'>Opponent</div>
        <div className='w-1/12 bg-gray-400'>FDR</div>
      </div>
      {createFixtures()}
    </div>
  );

  return ReactDom.createPortal(
    <div>
      <div
        className='dimmer flex absolute inset-0 bg-modalDimmer'
        onClick={props.onDismiss}
        tabIndex={-1}
        role='presentation'
      >
        <form
          className='modal flex flex-col m-auto max-w-xl max-h-full bg-white w-6/12 p-4'
          onClick={(e) => e.stopPropagation()}
          role='presentation'
        >
          <div className='flex justify-between bg-secondary p-4 pb-0'>
            <div className='text-white'>
              <div className='text-xl font-semibold mb-2'>
                <span>{player.firstName}</span>
                <span>{player.secondName}</span>
              </div>
              <span
                className={`${backgroundColors[player.position]} p-1`}
                style={{ color: 'black' }}
              >
                {player.position}
              </span>
              <div className='text-sm'>{player.club}</div>
            </div>

            <div className=''>
              <img
                className='mt-2 mr-10'
                style={{ height: '100%', maxHeight: '10rem' }}
                src='/images/players/500x500/101188.png'
                alt='playerPhoto'
              />
            </div>
          </div>

          <ul className='self-center flex flex-row bg-primary rounded text-sm m-6'>
            <li
              onClick={() => setCurrentTab('history')}
              role='presentation'
              className={classNames('pl-4', 'pr-4', 'm-1', 'cursor-pointer', {
                'bg-white': currentTab === 'history',
              })}
            >
              History
            </li>
            <li
              onClick={() => setCurrentTab('fixtures')}
              role='presentation'
              className={classNames('pl-4', 'pr-4', 'm-1', 'cursor-pointer', {
                'bg-white': currentTab === 'fixtures',
              })}
            >
              Fixtures
            </li>
          </ul>

          {currentTab === 'history' ? renderHistory() : renderFixtures()}
        </form>
      </div>
    </div>,
    document.querySelector('#modal') as Element,
  );
};

export default PlayerDialog;
