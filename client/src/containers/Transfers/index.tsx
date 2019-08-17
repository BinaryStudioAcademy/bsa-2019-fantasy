import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PlayersSelection from 'components/PlayersSelection';
import TeamSelection from 'components/Gameweek/TeamSelection';
import FixturesContainer from 'containers/FixturesContainer';

import { RootState } from 'store/types';
import { fetchGameweekHistory } from 'containers/Routing/fetchGameweeks/actions';

const Transfers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.profile);
  const gameweeks = useSelector((state: RootState) => state.gameweeks.gameweeks);
  const gameweekPlayers = useSelector(
    (state: RootState) => state.gameweeks.gameweeks_history,
  );

  useEffect(() => {
    dispatch(fetchGameweekHistory(user!.id, gameweeks[0]!.id));
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Transfers | Fantasy Football League';
  }, []);

  return (
    <div className='transfers-page'>
      <div className='jumbotron paper mb-12 rounded pt-12'>
        <div className='sub title mb-4 flex items-center'>Transfers Page</div>
        <h2 className='title text-secondary mb-6'>Transfers</h2>
        <div className='jumbotron-content mt-2 flex'>
          <div style={{ width: '25%' }}>
            <PlayersSelection />
          </div>
          <div className='flex flex-grow justify-center'>
            <div className='wrapper'>
              <TeamSelection isGameweek={false} players={gameweekPlayers} />
            </div>
          </div>
        </div>
      </div>
      <FixturesContainer />
    </div>
  );
};

export default Transfers;
