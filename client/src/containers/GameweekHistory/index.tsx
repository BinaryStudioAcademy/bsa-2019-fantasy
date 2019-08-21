import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Line as LineChart } from 'react-chartjs-2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';

import { RootState } from 'store/types';

import TeamSelection from 'components/Gameweek/TeamSelection';
import Spinner from 'components/Spinner';
import { getChartOptions } from 'helpers/gameweekChart';

import { loadGameweeksHistoryAction, loadTeamHistoryAction } from './actions';
import styles from './styles.module.scss';
import header from 'styles/header.module.scss';

const GameweekHistory = ({
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
  gameweeksHistory,
  teamHistory,
  isLoading,
}) => {
  const { t } = useTranslation();
  const user_id = useSelector(
    (state: RootState) => state.profile.user && state.profile.user.id,
  );

  const [currentGameweek, setCurrentGameweek] = useState<number>(0);

  useEffect(() => {
    document.title = 'Home | Fantasy Football League';
    loadGameweeksHistoryAction(user_id);
  }, [loadGameweeksHistoryAction]);

  useEffect(() => {
    if (gameweeksHistory) {
      const gameweekId = gameweeksHistory[currentGameweek].gameweek.id;
      loadTeamHistoryAction(user_id, gameweekId);
    }
  }, [currentGameweek, gameweeksHistory, loadTeamHistoryAction]);
  const displayRadar = () => gameweeksHistory.map((item) => item.team_score);

  if (!gameweeksHistory || !teamHistory) {
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
            {`${t('GameweekHistoryPage.titles.main')}  ${currentGameweek + 1}`}
          </h2>
          {currentGameweek >= 1 && (
            <button
              onClick={() => setCurrentGameweek(currentGameweek - 1)}
              className='g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded mr-6 font-bold'
            >
              <FaChevronLeft />
              {t('previous')}
            </button>
          )}
          {currentGameweek < gameweeksHistory.length - 1 && (
            <button
              onClick={() => setCurrentGameweek(currentGameweek + 1)}
              className='g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded font-bold'
            >
              {t('next')}
              <FaChevronRight />
            </button>
          )}
        </div>
        <div className='w-6/12'>
          <LineChart data={getChartOptions(displayRadar())} />
        </div>
      </div>
      <div className={styles['gameweek-history-content']}>
        <div className={`${header.paper} rounded mr-2`}>
          <TeamSelection isGameweek playersHistory={teamHistory} />
        </div>
        <div
          className={`${header.paper} px-8 pt-12 rounded ${styles['gameweek-stats']} ml-2`}
        >
          <h3 className={`${header.title} text-secondary mb-1`}>
            {t('GameweekHistoryPage.currentPoints')}
          </h3>
          <p className={`pl-3 ${styles.points}`}>
            <span className='font-bold'>47</span>
            {` ${t('GameweekHistoryPage.points')}`}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  gameweeksHistory: rootState.gameweekHistory.gameweeksHistory,
  teamHistory: rootState.gameweekHistory.teamHistory,
  isLoading: rootState.gameweekHistory.isLoading,
});

const actions = {
  loadGameweeksHistoryAction,
  loadTeamHistoryAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameweekHistory);
