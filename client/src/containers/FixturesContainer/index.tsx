import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { bindActionCreators, Dispatch } from 'redux';
import moment from 'moment';

import { loadGameweeksAction, loadGamesAction } from './actions';
import { RootState } from 'store/types';
import { FixturesItemType } from 'types/fixtures.types';
import { GameweekType } from 'types/gameweek.type';

import Fixtures from 'components/Fixtures/Fixtures';
import Spinner from 'components/Spinner';

import styles from './styles.module.scss';
import component from 'components/Fixtures/styles.module.scss';

type Props = {
  gameweeks: GameweekType[];
  loadGameweeksAction: typeof loadGameweeksAction;
  loadGamesAction: typeof loadGamesAction;
  games?: [FixturesItemType];
  isLoading: boolean;
};

const FixturesContainer = ({
  loadGameweeksAction,
  loadGamesAction,
  gameweeks,
  games,
  isLoading,
}: Props) => {
  const { t } = useTranslation();

  const [currentGameweek, setCurrentGameweek] = useState<number>(0);
  useEffect(() => {
    document.title = 'Fixtures | Fantasy Football League';
    loadGameweeksAction();
  }, [loadGameweeksAction]);

  useEffect(() => {
    if (gameweeks) {
      const gameweek = gameweeks.find((gw) => {
        const now = moment();
        return moment(now).isBefore(gw.end);
      });
      if (gameweek) {
        const gameweekNumber = gameweek.number;
        setCurrentGameweek(gameweekNumber - 1);
      }
    }
  }, [gameweeks]);

  useEffect(() => {
    if (gameweeks) {
      loadGamesAction(currentGameweek + 1);
    }
  }, [currentGameweek, gameweeks, loadGamesAction]);

  if (!games || !gameweeks) {
    return (
      <div className='relative bg-white py-3 min-h-screen shadow-figma'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='bg-white py-3 min-h-screen shadow-figma'>
      <div
        className={cn(
          component['fixtures-list'],
          'flex',
          'flex-col',
          'items-stretch',
          'text-center',
          'max-w-2xl',
        )}
      >
        <h2 className='text-5xl'>{t('Fixtures.title')}</h2>
        <p className='mb-3'>
          Gameweek {currentGameweek + 1} -{' '}
          {moment(gameweeks[currentGameweek].start).format('ddd D MMMM YYYY')}
        </p>

        <div className='text-center text-white text-2xl mb-4 flex justify-between'>
          {currentGameweek >= 1 && (
            <button
              className='btn bg-green-600 px-20 py-1 rounded'
              onClick={() => setCurrentGameweek(currentGameweek - 1)}
            >
              {t('previous')}
            </button>
          )}
          {currentGameweek < gameweeks.length - 1 && (
            <button
              className={cn(
                styles['btn-next'],
                'btn',
                'bg-green-600',
                'px-20',
                'py-1',
                'rounded',
              )}
              onClick={() => setCurrentGameweek(currentGameweek + 1)}
            >
              {t('next')}
            </button>
          )}
        </div>
        {!isLoading && <Fixtures games={games} />}
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  gameweeks: rootState.fixtures.gameweeks,
  games: rootState.fixtures.games,
  isLoading: rootState.fixtures.isLoading,
});

const actions = {
  loadGameweeksAction,
  loadGamesAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FixturesContainer);
