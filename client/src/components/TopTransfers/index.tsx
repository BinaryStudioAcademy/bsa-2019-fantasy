import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactTable from 'react-table';
import { RootState } from 'store/types';
import { Position, PlayerType } from 'types/player.types';
import PlayerDialog from 'components/PlayerDialog';
import { loadPlayersAction } from '../../components/PlayersSelection/actions';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import info from 'assets/images/info.svg';

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
  const dataTransfersIn = [
    {
      info: 'info',
      direction: <FaArrowAltCircleRight />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
    {
      info: 'info',
      direction: <FaArrowAltCircleRight />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
    {
      info: 'info',
      direction: <FaArrowAltCircleRight />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
    {
      info: 'info',
      direction: <FaArrowAltCircleRight />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
    {
      info: 'info',
      direction: <FaArrowAltCircleRight />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
  ];
  const dataTransfersOut = [
    {
      info: 'info',
      direction: <FaArrowAltCircleLeft />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
    {
      info: 'info',
      direction: <FaArrowAltCircleLeft />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
    {
      info: 'info',
      direction: <FaArrowAltCircleLeft />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
    {
      info: 'info',
      direction: <FaArrowAltCircleLeft />,
      position: '',
      name: '',
      club: '',
      number: '',
    },
    {
      info: 'info',
      direction: <FaArrowAltCircleLeft />,
      position: '',
      name: '',
      club: '',
      number: '',
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
        let clubIndexIn = topTransfers.transfersIn[i].club_id - 1;
        let clubIndexOut = topTransfers.transfersOut[i].club_id - 1;

        dataTransfersIn[i].position = topTransfers.transfersIn[i].position;
        dataTransfersIn[i].name = topTransfers.transfersIn[i].second_name;
        dataTransfersIn[i].club = clubs[clubIndexIn].short_name;
        dataTransfersIn[i].number = topTransfers.transfersIn[i].transfers_in;

        dataTransfersOut[i].position = topTransfers.transfersOut[i].position;
        dataTransfersOut[i].name = topTransfers.transfersOut[i].second_name;
        dataTransfersOut[i].club = clubs[clubIndexOut].short_name;
        dataTransfersOut[i].number = topTransfers.transfersOut[i].transfers_out;
      }

      console.log(dataTransfersIn, dataTransfersOut);
    }
  }, [topTransfers]);

  return (
    <div>
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        data={dataTransfersIn}
        showPagination={false}
      />
      <ReactTable
        defaultPageSize={5}
        columns={columns}
        data={dataTransfersOut}
        showPagination={false}
      />
    </div>
  );
};
