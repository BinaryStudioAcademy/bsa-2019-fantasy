import React, { useEffect, useState } from 'react';
import ReactSearchBox from 'react-search-box';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadPlayersAction } from '../../components/PlayersSelection/actions';
import { RootState } from 'store/types';
import { Player } from 'types/player.types';

import { PlayerList } from '../PlayersList/index';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

type Props = {
  loadPlayersAction: typeof loadPlayersAction;
  players?: Player[];
};

const PlayersSelection = ({ loadPlayersAction, players }: Props) => {
  const [query, setQuery] = useState({
    limit: 10,
    order_direction: 'DESC',
    order_field: 'player_score',
    position: undefined,
    club_id: undefined,
    first_name: undefined
  });

  const [sortSelect, setSortSelect] = useState({
    value: 'player_score',
    label: 'Total points',
  });

  const [filterSelect, setFilterSelect] = useState({
    value: '',
    label: 'All players',
  });

  const [search, setSearch] = useState({
    value: '',
  });

  useEffect(() => {
    loadPlayersAction({ ...query });
  }, [query]);

  const onSortChange = (item: any) => {
    setSortSelect(item);
    setQuery({ ...query, order_field: item.value });
    loadPlayersAction({ ...query });
  };
  const onFilterSelectChange = (item: any) => {
    setFilterSelect(item);
    setQuery({ ...query, ...item.value });
    loadPlayersAction({ ...query });
  };

  const onSearchChange = (item: any) => {
    setSearch(item);
    setQuery({ ...query, first_name: item.value });
    loadPlayersAction({ ...query });
  };

  const sortedBy = [
    { value: 'player_score', label: 'Total points' },
    { value: 'player_price', label: 'Price' },
    { value: 'goals', label: 'Goals' },
    { value: 'assists', label: 'Assists' },
    { value: 'missed_passes', label: 'Missed passes' },
    { value: 'goals_conceded', label: 'Goals conceded' },
    { value: 'saves', label: 'Saves' },
    { value: 'yellow_cards', label: 'Yellow cards' },
    { value: 'red_cards', label: 'Red cards' },
  ];

  const filteredBy = [
    {
      type: 'group',
      name: 'Global',
      items: [{ value: {}, label: 'All players' }],
    },
    {
      type: 'group',
      name: 'By Position',
      items: [
        { value: { position: 1 }, label: 'Goalkeepers' },
        { value: { position: 2 }, label: 'Defenders' },
        { value: { position: 3 }, label: 'Midifilders' },
        { value: { position: 4 }, label: 'Forwards' },
      ],
    },
    {
      type: 'group',
      name: 'By Team',
      items: [
        { value: { club_id: 1 }, label: 'Arsenal' },
        { value: { club_id: 2 }, label: 'Aston Villa' },
        { value: { club_id: 3 }, label: 'Bournemouth' },
        { value: { club_id: 4 }, label: 'Brighton' },
        { value: { club_id: 5 }, label: 'Burnley' },
        { value: { club_id: 6 }, label: 'Chelsea' },
        { value: { club_id: 7 }, label: 'Crystal Palace' },
        { value: { club_id: 8 }, label: 'Everton' },
        { value: { club_id: 9 }, label: 'Leicester' },
        { value: { club_id: 10 }, label: 'Liverpool' },
        { value: { club_id: 11 }, label: 'Man City' },
        { value: { club_id: 12 }, label: 'Man Utd' },
        { value: { club_id: 13 }, label: 'Newcastle' },
        { value: { club_id: 14 }, label: 'Norwich' },
        { value: { club_id: 15 }, label: 'Sheffield Utd' },
        { value: { club_id: 16 }, label: 'Southampton' },
        { value: { club_id: 17 }, label: 'Spurs' },
        { value: { club_id: 18 }, label: 'Watford' },
        { value: { club_id: 19 }, label: 'West Ham' },
        { value: { club_id: 20 }, label: 'Wolves' },
      ],
    },
  ];

  const data = [
    {
      key: 'john',
      value: 'John Doe',
    },
    {
      key: 'jane',
      value: 'Jane Doe',
    },
    {
      key: 'mary',
      value: 'Mary Phillips',
    },
    {
      key: 'robert',
      value: 'Robert',
    },
    {
      key: 'karius',
      value: 'Karius',
    },
  ]

  return (
    <div className='bg-gray-300 px-4 py-4'>
      <h3 className='font-bold'>Player Selection</h3>
      <form>
        <div className='mt-2'>
          <label className='font-bold'>
            <span>View</span>
          </label>
          <Dropdown
            options={filteredBy as any}
            onChange={onFilterSelectChange}
            value={filterSelect}
          />
        </div>
        <div className='mt-2'>
          <label className='font-bold'>
            <span>Sorted by</span>
          </label>
          <Dropdown 
            options={sortedBy} 
            onChange={onSortChange} 
            value={sortSelect} />
        </div>

        <div className='mt-2'>
          <label className='font-bold'>
            <span>Search</span>
          </label>
          <ReactSearchBox 
            onChange={onSearchChange}
            data={data}
          />
        </div>
      </form>

      <p className='w-full mt-4 text-center'>
        <strong>10</strong> players shown
      </p>

      <PlayerList players={players} />
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  players: rootState.playerSelection.players,
});

const actions = { loadPlayersAction };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersSelection);
