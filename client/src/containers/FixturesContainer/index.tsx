import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import moment from 'moment';

import { loadGameweeksAction, loadGamesAction } from './actions';
import { RootState } from 'store/types';
import { GameweeksType, FixturesItemType } from 'types/fixtures.types';

import Fixtures from 'components/Fixtures/Fixtures';
import Spinner from 'components/Spinner';

import './styles.scss';

type Props = {
  gameweeks?: GameweeksType;
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
  const [currentGameweek, setCurrentGameweek] = useState<number>(0);

  useEffect(() => {
    loadGameweeksAction();
  }, [loadGameweeksAction]);

  useEffect(() => {
    if (gameweeks) {
      loadGamesAction(currentGameweek + 1);
    }
  }, [currentGameweek, gameweeks, loadGamesAction]);

  if (!games || !gameweeks) {
    return <Spinner />;
  }

  return ( 
    <div className='bg-white py-3 min-h-screen shadow-figma'>
      <div className='fixtures-list flex flex-col items-stretch text-center max-w-2xl'>
        <h2 className='text-5xl'>Fixtures</h2>
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
              Prev
            </button>
          )}
          {currentGameweek < gameweeks.length - 1 && (
            <button
              className='btn btn-next bg-green-600 px-20 py-1 rounded'
              onClick={() => setCurrentGameweek(currentGameweek + 1)}
            >
              Next
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
