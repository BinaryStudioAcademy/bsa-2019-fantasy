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

  const renderDataTransfersIn = () => {
    const dataTransfersIn: topTransferType[] = [];

    if (topTransfers !== undefined && topTransfers.transfersIn) {
      for (let i = 0; i < 5; i++) {
        const clubIndexIn = topTransfers.transfersIn[i].club_id - 1;
        const itemIn = {
          info: 'info',
          direction: <FaArrowAltCircleRight />,
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

    return dataTransfersOut;
  };

  return (
    <div>
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        data={renderDataTransfersIn()}
        showPagination={false}
      />
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        data={renderDataTransfersOut()}
        showPagination={false}
      />
    </div>
  );
};
