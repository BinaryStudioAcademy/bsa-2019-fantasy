import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Line as LineChart } from 'react-chartjs-2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Redirect } from 'react-router';

import { RootState } from 'store/types';

// import TeamSelectionOLD from 'components/Gameweek/TeamSelection';
import TeamSelection from 'components/TeamSelection';
import TopTransfers from 'components/TopTransfers';

import Spinner from 'components/Spinner';
import { getChartOptions } from 'helpers/gameweekChart';

import {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  setCurrentGameweekAction,
} from './actions';
import { setInviteCode } from 'containers/Profile/actions';
import { currentGameweekSelector } from 'store/selectors/current-gameweek.selector';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';
import { GameweekStatsSidebar } from 'components/GameweekStatsSidebar';

import { usePitchPlayers } from 'components/Pitch/use-pitch-players.hook';

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

  const globalCurrentGameweek = useSelector(currentGameweekSelector);

  const { pitchPlayers, setPitch, setPitchFromPlainPlayers } = usePitchPlayers(
    teamHistory,
  );

  useEffect(() => {
    if (teamHistory.length) {
      setPitchFromPlainPlayers(teamHistory);
    }
  }, [teamHistory]);

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
            {`${t('GameweekHistoryPage.titles.main')} ${
              teamHistory.length
                ? currentGameweek
                : globalCurrentGameweek
                ? globalCurrentGameweek!.number
                : ''
            }`}
          </h2>
          <div className='text-center mb-4 flex justify-between text-sm'>
            {currentGameweek > 1 && (
              <button
                onClick={() => dispatch(setCurrentGameweekAction(currentGameweek - 1))}
                disabled={isLoading}
                className={`g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded mr-6 font-bold`}
                style={{ outline: 'none' }}
              >
                <FaChevronLeft className={styles['svg-button']} />
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
                style={{ outline: 'none' }}
              >
                {t('next')}
                <FaChevronRight className={styles['svg-button']} />
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
          <div className={cn(header.paper, 'rounded', 'p-8', 'relative')}>
            {isLoading ? (
              <Spinner />
            ) : (
              // <TeamSelectionOLD isGameweek playersHistory={teamHistory || []} />
              <TeamSelection
                players={pitchPlayers}
                setPlayers={setPitch}
                showFixtures={false}
                hasBench
                disabled
              />
            )}
          </div>

          <GameweekStatsSidebar
            gameweekHistory={gameweeksHistory[currentGameweek - 1]}
            userRank={userRank}
          />
        </React.Fragment>
      </div>

      <div className={cn(header.paper, 'px-8', 'py-8', 'rounded', 'mt-4')}>
        <TopTransfers />
      </div>
    </div>
  );
};

export default GameweekHistory;
