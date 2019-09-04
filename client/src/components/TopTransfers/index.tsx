import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';
import ReactTable from 'react-table';
import { RootState } from 'store/types';
import PlayerDialog from 'components/PlayerDialog';
import {
  loadPlayersAction,
  resetPlayersAction,
} from '../../components/PlayersSelection/actions';
import { PlayerType } from 'types/player.types';
import {
  fetchDataForPlayer,
  resetPlayerDialogData,
} from '../../containers/Players/actions';
import cn from 'classnames';

import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';

type topTransferType = {
  info: any;
  direction: any;
  position: string;
  name: string;
  club: string;
  number: number;
};

type Props = {
  resetPlayerDialogData: any;
  fetchDataForPlayer: any;
  playerData?: any;
  dialogLoading: boolean;
};

const TopTransfers = ({
  resetPlayerDialogData,
  fetchDataForPlayer,
  playerData,
  dialogLoading,
}) => {
  const columns = [
    {
      Header: '',
      accessor: 'info',
      className: 'flex items-center justify-center',
    },
    {
      Header: '',
      accessor: 'direction',
      className: 'flex items-center justify-center',
    },
    {
      Header: 'Positon',
      accessor: 'position',
      className: 'flex items-center justify-center font-bold',
    },
    {
      Header: 'Player',
      accessor: 'name',
      className: 'flex items-center justify-center',
    },
    {
      Header: 'Club',
      accessor: 'club',
      className: 'flex items-center justify-center font-bold',
    },
    {
      Header: 'Number',
      accessor: 'number',
      className: 'flex items-center justify-center font-bold',
    },
  ];

  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.playerSelection.players);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const [query, setQuery] = useState({
    limit: 5,
    order_direction: 'DESC',
    order_field: 'transfers_in',
  });
  const [topTransfers, setTopTransfers] = useState();
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>();

  useEffect(() => {
    dispatch(loadPlayersAction(query));
    if (query.order_field === 'transfers_in') {
      setQuery({ ...query, order_field: 'transfers_out' });
    }
  }, [query]);

  useEffect(() => {
    if (players.length > 0) {
      if (topTransfers === undefined) {
        setTopTransfers({ ...topTransfers, transfersIn: players });
      } else {
        setTopTransfers({ ...topTransfers, transfersOut: players });
      }
    }
  }, [players]);

  useEffect(() => {
    return () => {
      dispatch(resetPlayersAction());
      console.log('unmount');
    };
  }, []);

  const onOpenInfo = (dir: string, id: string, club_id: string) => {
    if (topTransfers.transfersIn && topTransfers.transfersOut) {
      const player =
        dir === 'in'
          ? topTransfers.transfersIn.find((p) => p && id === p.id)
          : topTransfers.transfersOut.find((p) => p && id === p.id);
      setCurrentPlayer(player);
      fetchDataForPlayer(id, club_id);
    }
  };

  const renderDataTransfersIn = () => {
    const dataTransfersIn: topTransferType[] = [];

    if (topTransfers !== undefined && topTransfers.transfersIn) {
      for (let i = 0; i < 5; i++) {
        const clubIndexIn = topTransfers.transfersIn[i].club_id - 1;

        const itemIn = {
          info: (
            <button
              className='w-6 h-6 p-1 flex justify-center leading-none flex bg-background rounded-full text-s font-bold opacity-30 hover:opacity-75 focus:outline-none'
              onClick={() =>
                onOpenInfo(
                  'in',
                  topTransfers.transfersIn[i].id,
                  topTransfers.transfersIn[i].club_id,
                )
              }
            >
              i
            </button>
          ),
          direction: <FaArrowRight size={20} className={cn('text-green-500')} />,
          position: topTransfers.transfersIn[i].position,
          name: topTransfers.transfersIn[i].second_name,
          club: clubs[clubIndexIn].short_name,
          number: topTransfers.transfersIn[i].transfers_in,
        };
        dataTransfersIn.push(itemIn);
      }
    }

    return dataTransfersIn;
  };

  const renderDataTransfersOut = () => {
    const dataTransfersOut: topTransferType[] = [];

    if (topTransfers !== undefined && topTransfers.transfersOut) {
      for (let i = 0; i < 5; i++) {
        const clubIndexOut = topTransfers.transfersOut[i].club_id - 1;
        const itemOut = {
          info: (
            <button
              className='w-6 h-6 p-1 flex justify-center leading-none flex bg-background rounded-full text-s font-bold opacity-30 hover:opacity-75 focus:outline-none'
              onClick={() =>
                onOpenInfo(
                  'out',
                  topTransfers.transfersOut[i].id,
                  topTransfers.transfersOut[i].club_id,
                )
              }
            >
              i
            </button>
          ),
          direction: <FaArrowLeft size={20} className={cn('text-red-500')} />,
          position: topTransfers.transfersOut[i].position,
          name: topTransfers.transfersOut[i].second_name,
          club: clubs[clubIndexOut].short_name,
          number: topTransfers.transfersOut[i].transfers_out,
        };
        dataTransfersOut.push(itemOut);
      }
    }

    return dataTransfersOut;
  };

  const onModalDismiss = () => {
    resetPlayerDialogData();
    setCurrentPlayer(undefined);
  };

  return (
    <div>
      <div className={cn('flex', 'items-center', 'mb-2')}>
        <FaArrowAltCircleRight size={30} className={cn('text-green-500', 'mr-2')} />
        <h2 className={cn('text-2xl', 'font-semibold', 'align-middle')}>
          Top Transfers in
        </h2>
      </div>
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        data={renderDataTransfersIn()}
        showPagination={false}
        className={cn('mb-8')}
      />
      <div className={cn('flex', 'items-center', 'mb-2')}>
        <FaArrowAltCircleLeft size={30} className={cn('text-red-500', 'mr-2')} />
        <h2 className={cn('text-2xl', 'font-semibold', 'align-middle')}>
          Top Transfers out
        </h2>
      </div>
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        data={renderDataTransfersOut()}
        showPagination={false}
      />

      {currentPlayer && (
        <PlayerDialog
          playerDialogData={playerData}
          onDismiss={onModalDismiss}
          loading={dialogLoading}
          player={currentPlayer}
        />
      )}
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  playerData: rootState.players.playerData,
  dialogLoading: rootState.players.dialogLoading,
});

const actions = { fetchDataForPlayer, resetPlayerDialogData };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopTransfers);
