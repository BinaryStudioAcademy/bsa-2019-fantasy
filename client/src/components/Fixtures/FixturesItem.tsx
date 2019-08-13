import React from 'react';
import moment from 'moment';

import { FixturesItemType } from 'types/fixtures.types';

import './styles.scss';

type Props = {
  match: FixturesItemType;
};

const FixturesItem = ({ match }: Props) => {
  if (!match) {
    return null;
  }
  return (
    <li className='flex items-center p-3'>
      <div className='first-team team justify-end'>
        <img
          className='logo order-1'
          src={`images/club-logos/badge_${match.hometeam.code}_200.png`}
          alt='logo'
        />
        <h5 className='font-bold'>{match.hometeam.name}</h5>
      </div>
      <div className='time p-3 py-2 rounded mx-2 play-time'>
        <p>{moment(match.start).format('HH:mm')}</p>
      </div>
      <div className='second-team team'>
        <img
          className='logo'
          src={`images/club-logos/badge_${match.awayteam.code}_200.png`}
          alt='logo'
        />
        <h5 className='font-bold'>{match.awayteam.name}</h5>
      </div>
    </li>
  );
};

export default FixturesItem;
