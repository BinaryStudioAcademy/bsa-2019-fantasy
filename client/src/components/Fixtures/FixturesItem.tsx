import React, { useState } from 'react';
import cn from 'classnames';
import moment from 'moment';

import { FixturesItemType } from 'types/fixtures.types';

import styles from './styles.module.scss';
import MatchStats from 'components/MatchStats';

type Props = {
  match: FixturesItemType;
};

const stats = [
  {
    title: 'Goals',
    hometeam_stats: [
      {
        player: 'Salah',
        count: 3,
      },
      {
        player: 'Messi',
        count: 5,
      },
    ],
    awayteam_stats: [
      {
        player: 'Ricardo Milas',
        count: 2,
      },
    ],
  },
  {
    title: 'Assists',
    hometeam_stats: [
      {
        player: 'Flamie',
        count: 3,
      },
      {
        player: 'Zeus',
        count: 5,
      },
      {
        player: 'S1mple',
        count: 5,
      },
    ],
    awayteam_stats: [
      {
        player: 'Ricardo Milas',
        count: 10,
      },
    ],
  },
  {
    title: 'Yellow cards',
    hometeam_stats: [
      {
        player: 'Lionel Messi',
        count: 1,
      },
      {
        player: 'Messi',
        count: 3,
      },
    ],
    awayteam_stats: [
      {
        player: 'Ricardo Milas',
        count: 2,
      },
      {
        player: 'Ricardo Milas1',
        count: 4,
      },
      {
        player: 'Ricardo Milas2',
        count: 8,
      },
      {
        player: 'Ricardo Milas3',
        count: 1,
      },
    ],
  },
  {
    title: 'Saves',
    hometeam_stats: [
      {
        player: 'Salah',
        count: 3,
      },
    ],
    awayteam_stats: [],
  },
];

const FixturesItem = ({ match }: Props) => {
  const [isDisplay, setIsDisplay] = useState(false);

  const toggleStats = () => {
    if (match.started) {
      setIsDisplay(!isDisplay);
    }
  };

  const displayStats = () =>
    stats.map(({ title, awayteam_stats, hometeam_stats }) => (
      <MatchStats
        title={title}
        awayteam_stats={awayteam_stats}
        hometeam_stats={hometeam_stats}
        key={`stats-${title}-${match.id}`}
      />
    ));

  let label = <p>{moment(match.start).format('HH:mm')}</p>;

  if (match.started) {
    label = (
      <div className='flex'>
        <p
          className={cn(styles['home-score'], 'score text-white font-bold bg-green-900')}
        >
          {match.hometeam_score}
        </p>
        <p
          className={cn(styles['away-score'], 'score text-white font-bold bg-green-900')}
        >
          {match.awayteam_score}
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* eslint-disable */}
      <li
        className={`flex items-center p-3 ${match.started ? 'cursor-pointer' : ''} ${
          isDisplay ? 'bg-green-600 text-white' : ''
        }`}
        onClick={() => toggleStats()}
      >
      {/* eslint-enable */}
        <div className={cn(styles['first-team'], styles.team, 'justify-end')}>
          <img
            className={cn(styles.logo, 'order-1')}
            src={`images/club-logos/badge_${match.hometeam.code}_200.png`}
            alt='logo'
          />
          <h5 className='font-bold'>{match.hometeam.name}</h5>
        </div>
        <div
          className={`time p-3 py-2 rounded mx-2 ${styles['play-time']} ${
            match.started ? 'bg-green-900' : ''
          }`}
        >
          {label}
        </div>
        <div className={cn(styles.team, 'text-left')}>
          <img
            className={styles.logo}
            src={`images/club-logos/badge_${match.awayteam.code}_200.png`}
            alt='logo'
          />
          <h5 className='font-bold'>{match.awayteam.name}</h5>
        </div>
      </li>
      {isDisplay && <div className='bg-gray-100 mb-4 p-3'>{displayStats()}</div>}
    </React.Fragment>
  );
};

export default FixturesItem;
