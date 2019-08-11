import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadGameweeksAction, loadGamesAction } from './actions';
import { RootState } from 'store/types';

import Fixtures from 'components/Fixtures/Fixtures';
import Spinner from 'components/Spinner';

import './styles.scss';

type Props = {
  gameweeks: string;
  loadGameweeksAction: typeof loadGameweeksAction;
};

const FixturesContainer = ({
  loadGameweeksAction,
  loadGamesAction,
  gameweeks,
  games,
}: any) => {
  const [gameweeksList, setGameweeksList]: any = useState([]);
  const [currentGameweek, setCurrentGameweek]: any = useState(0);
  const [gamesList, setGamesList]: any = useState([]);

  useEffect(() => {
    loadGameweeksAction();
  }, []);

  useEffect(() => {
    if (gameweeks) {
      setGameweeksList(gameweeks);
      loadGamesAction(gameweeks[currentGameweek].id);
    }
  }, [gameweeks]);

  useEffect(() => {
    if (games) {
      setGamesList(games);
    }
  }, [games]);

  if (!gameweeksList) {
    return <Spinner />;
  }
  console.log(currentGameweek);
  return (
    <div className='bg-white py-3'>
      <div className='fixtures-list flex flex-col items-stretch text-center max-w-2xl'>
        <h2 className='text-5xl'>Fixtures</h2>
        <p className='mb-3'>
          Gameweek - {/* {moment(fakeMatches[0].date).format('ddd D MMMM YYYY')} */}
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
          {currentGameweek < gameweeksList.length - 1 && (
            <button
              className='btn btn-next bg-green-600 px-20 py-1 rounded'
              onClick={() => setCurrentGameweek(currentGameweek + 1)}
            >
              Next
            </button>
          )}
        </div>
        <Fixtures />
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  gameweeks: rootState.fixtures.gameweeks,
  games: rootState.fixtures.games,
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
