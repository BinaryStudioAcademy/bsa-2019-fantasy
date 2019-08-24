import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Line as LineChart } from 'react-chartjs-2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import cn from 'classnames';

import { RootState } from 'store/types';

import TeamSelection from 'components/Gameweek/TeamSelection';

import Spinner from 'components/Spinner';
import { getChartOptions } from 'helpers/gameweekChart';

import { loadGameweeksHistoryAction, loadTeamHistoryAction } from './actions';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';

const GameweekHistory = () => {
  useEffect(() => {
    document.title = 'Home | Fantasy Football League';
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    gameweeks,
    user_rank: userRank,
    gameweeks_results: gameweekResults,
  } = useSelector((state: RootState) => state.gameweeks, shallowEqual);
  const { gameweeksHistory, teamHistory, isLoading } = useSelector(
    (state: RootState) => state.gameweekHistory,
    shallowEqual,
  );
  const userId = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.id,
  );

  const [currentGameweek, setCurrentGameweek] = useState<number>(1);

  useEffect(() => {
    if (userId) {
      dispatch(loadGameweeksHistoryAction(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (gameweeksHistory && gameweeksHistory.length) {
      setCurrentGameweek(gameweeksHistory[0].gameweek.number);
    }
  }, [gameweeksHistory]);

  useEffect(() => {
    if (gameweeksHistory && gameweeksHistory.length) {
      const idx = gameweeksHistory.findIndex((gw) => {
        return gw.gameweek.number === currentGameweek;
      });
      if (idx !== -1) {
        const gameweekId = gameweeksHistory[idx].gameweek.id;
        dispatch(loadTeamHistoryAction(userId, gameweekId, currentGameweek));
      }
    }
  }, [currentGameweek, gameweeksHistory.length]);

  const displayRadar = () => gameweeksHistory.map((item) => item.team_score);

  if (!gameweeksHistory) {
    return <Spinner />;
  }

  return (
    <div className={styles['gameweek-history']}>
      <div
        className={`${header.jumbotron} ${header.paper} mb-12 rounded flex items-end justify-between pt-6`}
      >
        <div className={`${header['jumbotron-content']} mt-32 mb-12`}>
          <h2 className={`${header.title} text-secondary mb-12`}>
            <div className={`${header.sub} ${header.title} mb-3 flex items-center`}>
              {t('GameweekHistoryPage.titles.sub')}
            </div>
            {`${t('GameweekHistoryPage.titles.main')}  ${currentGameweek}`}
          </h2>
          <div className='text-center mb-4 flex justify-between'>
            {currentGameweek >= 1 && (
              <button
                onClick={() => setCurrentGameweek(currentGameweek - 1)}
                disabled={isLoading}
                className={`g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded mr-6 font-bold`}
              >
                <FaChevronLeft />
                {t('previous')}
              </button>
            )}
            {currentGameweek < gameweeksHistory.length && (
              <button
                onClick={() => setCurrentGameweek(currentGameweek + 1)}
                disabled={isLoading}
                className={cn(
                  styles['btn-next'],
                  'g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded font-bold',
                )}
              >
                {t('next')}
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
        <div className='w-6/12'>
          {gameweekResults && gameweeks && (
            <LineChart
              data={getChartOptions(gameweeks, gameweekResults, displayRadar())}
            />
          )}
        </div>
      </div>

      <div className={styles['gameweek-history-content']}>
        <React.Fragment>
          <div className={cn(header.paper, 'rounded mr-2 relative')}>
            {isLoading ? (
              <Spinner />
            ) : (
              <TeamSelection isGameweek playersHistory={teamHistory || []} />
            )}
          </div>

          <div
            className={`${header.paper} px-8 pt-12 rounded ${styles['gameweek-stats']} ml-2`}
          >
            <h3 className={`${header.title} text-secondary mb-1`}>
              {t('GameweekHistoryPage.currentPoints')}
            </h3>
            <p className={`pl-3 ${styles.points}`}>
              <span className='font-bold'>
                {gameweeksHistory[gameweeksHistory.length - 1]
                  ? gameweeksHistory[gameweeksHistory.length - 1].team_score
                  : '0'}
              </span>
              {` ${t('GameweekHistoryPage.points')}`}
            </p>
            <h3 className={`${header.title} text-secondary mb-1`}>
              {t('GameweekHistoryPage.overallRank')}
            </h3>
            {userRank ? (
              <p className={`pl-3 ${styles.points}`}>
                <span className='font-bold'>{userRank.rank}</span>
              </p>
            ) : null}
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default GameweekHistory;
