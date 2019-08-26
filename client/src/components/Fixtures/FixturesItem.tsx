import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { FixturesItemType } from 'types/fixtures.types';
import { loadGameDetailsAction } from '../../containers/FixturesContainer/actions';
import { RootState } from 'store/types';

import styles from './styles.module.scss';
import MatchStats from 'components/MatchStats';
import Button from 'components/Button';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

type Props = {
  match: FixturesItemType;
};

const FixturesItem = ({ match }: Props) => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [stats, setStats] = useState<any>([]);
  const [isSubscribed, setSubscribe] = useState<boolean>(false);
  const dispatch = useDispatch();
  const gameDetails = useSelector((state: RootState) => state.fixtures.gameDetails);

  useEffect(() => {
    if (gameDetails) {
      gameDetails.forEach((g) => {
        setStats((stats) => {
          const team =
            g.player.player.club_id === match.hometeam_id
              ? 'hometeam_stats'
              : 'awayteam_stats';
          const statsItem = stats.find((st) => st.title === g.event_type);
          if (statsItem) {
            const index = statsItem[team].findIndex(
              (item) => item.player === g.player.player.second_name,
            );
            if (index !== -1) {
              statsItem[team][index].count = statsItem[team][index].count + 1;
            } else {
              statsItem[team].push({
                player: g.player.player.second_name,
                count: 1,
              });
            }
            const statsItemIndex = stats.findIndex((st) => st.title === g.event_type);
            return [
              ...stats.slice(0, statsItemIndex),
              statsItem,
              ...stats.slice(statsItemIndex + 1),
            ];
          } else {
            return [
              ...stats,
              {
                title: g.event_type,
                hometeam_stats: [],
                awayteam_stats: [],
                [team]: [
                  {
                    player: g.player.player.second_name,
                    count: 1,
                  },
                ],
              },
            ];
          }
        });
      });
    }
  }, [gameDetails]);

  const toggleStats = () => {
    setStats([]);
    if (match.started) {
      if (!isDisplay) {
        dispatch(loadGameDetailsAction(match.id));
      } else {
      }
      setIsDisplay(!isDisplay);
    }
  };

  const displayStats = () =>
    stats
      .sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      })
      .map(({ title, awayteam_stats, hometeam_stats }) => (
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
  const onSubscribe = () => {
    setSubscribe(!isSubscribed);
  };
  return (
    <React.Fragment>
      {/* eslint-disable */}
      <div className='flex flex-col items-center'>
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
        {match.started ? null : (
          <Button
            className='w-1/4 mb-1'
            styling={isSubscribed ? 'secondary' : 'primary'}
            onClick={(e) => onSubscribe()}
          >
            {isSubscribed ? (
              <p className='text-center'>Unsubscribe</p>
            ) : (
              <p className='text-center'>Subscribe</p>
            )}
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

export default FixturesItem;
