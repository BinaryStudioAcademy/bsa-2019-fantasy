import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactTable from 'react-table';
import { RootState } from 'store/types';
import { Position, PlayerType } from 'types/player.types';
import PlayerDialog from 'components/PlayerDialog';
import { loadPlayersAction } from '../../components/PlayersSelection/actions';
import cn from 'classnames';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import info from 'assets/images/info.svg';

type topTransferType = {
  info: string;
  direction: any;
  position: string;
  name: string;
  club: string;
  number: number;
};

export const TopTransfers = () => {
  const columns = [
    {
      Header: '',
      accessor: 'info',
    },
    {
      Header: '',
      accessor: 'direction',
    },
    {
      Header: 'Positon',
      accessor: 'position',
    },
    {
      Header: 'Player',
      accessor: 'name',
    },
    {
      Header: 'Club',
      accessor: 'club',
    },
    {
      Header: 'Number',
      accessor: 'number',
    },
  ];
  const dataTransfersIn: topTransferType[] = [];
  const dataTransfersOut: topTransferType[] = [];

  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.playerSelection.players);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const [query, setQuery] = useState({
    limit: 5,
    order_direction: 'DESC',
    order_field: 'transfers_in',
  });
  const [topTransfers, setTopTransfers] = useState();

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
    if (
      topTransfers !== undefined &&
      topTransfers.transfersIn &&
      topTransfers.transfersOut
    ) {
      for (let i = 0; i < 5; i++) {
        const clubIndexIn = topTransfers.transfersIn[i].club_id - 1;
        const clubIndexOut = topTransfers.transfersOut[i].club_id - 1;

        const itemIn = {
          info: 'info',
          direction: <FaArrowAltCircleRight />,
          position: topTransfers.transfersIn[i].position,
          name: topTransfers.transfersIn[i].second_name,
          club: clubs[clubIndexIn].short_name,
          number: topTransfers.transfersIn[i].transfers_in,
        };
        dataTransfersIn.push(itemIn);

        const itemOut = {
          info: 'info',
          direction: <FaArrowAltCircleLeft />,
          position: topTransfers.transfersOut[i].position,
          name: topTransfers.transfersOut[i].second_name,
          club: clubs[clubIndexOut].short_name,
          number: topTransfers.transfersOut[i].transfers_out,
        };
        dataTransfersOut.push(itemOut);
      }
    }
  }, [topTransfers]);

  return (
    <div className={cn('flex', 'justify-center')}>
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        data={[...dataTransfersIn]}
        showPagination={false}
        className={cn('w-1/2', 'mr-8', '')}
      />
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        data={[...dataTransfersOut]}
        showPagination={false}
        className={cn('w-1/2')}
      />
    </div>
  );
};
