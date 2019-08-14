import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadPlayersAction } from './actions';
import { RootState } from 'store/types';
import { Player } from 'types/player.types';

import { PlayersSelection } from '../../components/PlayersSelection/index';

type Props = {
  loadPlayersAction: typeof loadPlayersAction;
  players?: Player[];
};

const Transfers = ({ loadPlayersAction, players }: Props) => {
  useEffect(() => {
    loadPlayersAction();
  }, []);

  return (
    <div className='transfers-page'>
      <div className='jumbotron paper mb-12 rounded flex items-end justify-between pt-6'>
        <div className='jumbotron-content mt-16'>
          <h2 className='title text-secondary mb-6'>
            <div className='sub title mb-4 flex items-center'>Transfers Page</div>
            Transfers
          </h2>
          {/* TODO: pass players as props */}
          <PlayersSelection />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  players: rootState.transfer.players,
});

const actions = { loadPlayersAction };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transfers);
 