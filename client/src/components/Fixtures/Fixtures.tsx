import React from 'react';
import moment from 'moment';

import { flatMap } from 'lodash';

import FixturesItem from './FixturesItem';

type Props = {
  gameweek?: string;
  matches?: [
    {
      date: string;
      team1: {
        name: string;
        avatar: string;
      };
      team2: {
        name: string;
        avatar: string;
      };
    },
  ];
};

const fakeMatches = [
  {
    date: '2019-08-09 15:30',
    team1: { name: 'Liverpool', avatar: '' },
    team2: { name: 'LVP', avatar: '' },
  },
  {
    date: '2019-08-09  19:30',
    team1: { name: 'Juventus', avatar: '' },
    team2: { name: 'NE-Juventus', avatar: '' },
  },
  {
    date: '2019-08-11 12:30',
    team1: { name: 'Juventus', avatar: '' },
    team2: { name: 'Juventus', avatar: '' },
  },
  {
    date: '2019-08-11 12:30',
    team1: { name: 'Dinamo', avatar: '' },
    team2: { name: 'Navi', avatar: '' },
  },
  {
    date: '2019-09-09 19:30',
    team1: { name: 'Barselona', avatar: '' },
    team2: { name: 'Arsenal', avatar: '' },
  },
];

const Fixtures = ({ matches, gameweek }: Props) => {
  const renderMessages = () => {
    let currentDate = '';

    return flatMap(fakeMatches, (match: any) => {
      const res = [<FixturesItem data={match} key={`fixtures-${match.id}`} />];

      const messageDate = moment(match.date).format('dddd D MMMM YYYY');
      if (currentDate !== messageDate) {
        res.unshift(
          <div className='fixtures-list__daystamp block' key={`daystamp-${messageDate}`}>
            <span>{messageDate}</span>
          </div>,
        );
        currentDate = messageDate;
      }

      return res;
    });
  };

  return (
    <div className='bg-white py-3'>
      <div className='fixtures-list flex flex-col items-stretch text-center max-w-2xl'>
        <h2 className='text-5xl'>Fixtures</h2>
        <p className='mb-3'>
          Gameweek {gameweek} - {moment(fakeMatches[0].date).format('ddd D MMMM YYYY')}
        </p>
        {renderMessages()}
      </div>
    </div>
  );
};

export default Fixtures;
