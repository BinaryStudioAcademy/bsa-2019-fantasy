import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Line as LineChart } from 'react-chartjs-2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Redirect } from 'react-router';

import { RootState } from 'store/types';

import TeamSelection from 'components/Gameweek/TeamSelection';
import TopTransfers from '../../components/TopTransfers/index';

import Spinner from 'components/Spinner';
import { getChartOptions } from 'helpers/gameweekChart';

import {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  setCurrentGameweekAction,
} from './actions';
import { setInviteCode } from 'containers/Profile/actions';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';
import { Link } from 'react-router-dom';

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
  const { gameweeksHistory, teamHistory, isLoading, currentGameweek } = useSelector(
    (state: RootState) => state.gameweekHistory,
    shallowEqual,
  );

  const userId = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.id,
  );
  const { inviteCode } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (userId) {
      dispatch(loadGameweeksHistoryAction(userId));
    }
  }, [dispatch, userId]);

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

  if (inviteCode !== '') {
    dispatch(setInviteCode(''));
    return <Redirect to={`/joinLeague/${inviteCode}`} />;
  }

  if (!gameweeksHistory) {
    return <Spinner />;
  }

  return (
    <div className={styles['gameweek-history']}>
      <div
        className={cn(
          header.jumbotron,
          header.paper,
          'mb-12',
          'rounded',
          'flex',
          'items-end',
          'justify-between',
          'pt-6',
        )}
      >
        <div className={cn(header['jumbotron-content'], 'mt-32', 'mb-12')}>
          <h2 className={cn(header.title, 'text-secondary', 'mb-12')}>
            <div className={cn(header.sub, header.title, 'mb-3', 'flex', 'items-center')}>
              {t('GameweekHistoryPage.titles.sub')}
            </div>
            {`${t('GameweekHistoryPage.titles.main')}  ${currentGameweek}`}
          </h2>
          <div className='text-center mb-4 flex justify-between'>
            {currentGameweek > 1 && (
              <button
                onClick={() => dispatch(setCurrentGameweekAction(currentGameweek - 1))}
                disabled={isLoading}
                className={`g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded mr-6 font-bold`}
              >
                <FaChevronLeft />
                {t('previous')}
              </button>
            )}
            {currentGameweek < gameweeksHistory.length && (
              <button
                onClick={() => dispatch(setCurrentGameweekAction(currentGameweek + 1))}
                disabled={isLoading}
                className={cn(
                  styles['btn-next'],
                  'g-transparent',
                  'hover:bg-teal-400',
                  'text-secondary',
                  'hover:text-white',
                  'py-2',
                  'px-6',
                  'border-2',
                  'border-gray-700',
                  'hover:border-transparent',
                  'rounded',
                  'font-bold',
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
              data={getChartOptions(gameweeks, gameweekResults, displayRadar(), t)}
            />
          )}
        </div>
      </div>

      <div className={styles['gameweek-history-content']}>
        <React.Fragment>
          <div className={cn(header.paper, 'rounded mr-2', 'relative')}>
            {isLoading ? (
              <Spinner />
            ) : (
              <TeamSelection isGameweek playersHistory={teamHistory || []} />
            )}
          </div>

          <div
            className={cn(
              header.paper,
              styles['gameweek-stats'],
              'flex',
              'flex-col',
              'p-8',
              'rounded',
              'ml-2',
            )}
          >
            <h3 className={cn(header.title, 'text-secondary', 'mb-1')}>
              {t('GameweekHistoryPage.currentPoints')}
            </h3>
            <p className={cn('pl-3', styles.points)}>
              <span className='font-bold'>
                {gameweeksHistory[currentGameweek - 1]
                  ? gameweeksHistory[currentGameweek - 1].team_score
                  : '0'}
              </span>
              {` ${t('GameweekHistoryPage.points')}`}
            </p>
            <h3 className={cn(header.title, 'text-secondary', 'mb-1')}>
              {t('GameweekHistoryPage.overallRank')}
            </h3>
            {userRank ? (
              <p className={cn('pl-3', styles.points)}>
                <span className='font-bold'>{userRank.rank}</span>
              </p>
            ) : null}
            <div className={cn('entry-history-btn', 'self-center', 'mt-4')}>
              <Link
                to='/entry-history'
                className={cn(
                  'bg-primary',
                  'hover:bg-teal-400',
                  'uppercase',
                  'font-semibold',
                  'text-secondary',
                  'hover:text-white',
                  'py-2',
                  'px-8',
                  'border-2',
                  'border-teal-300',
                  'rounded mr-6',
                )}
              >
                {t('EntryHistory.title')}
              </Link>
            </div>
          </div>
        </React.Fragment>
      </div>

      <div className={cn(header.paper, 'px-8', 'py-8', 'rounded', 'mt-4')}>
        <TopTransfers />
      </div>
    </div>
  );
};

export default GameweekHistory;
