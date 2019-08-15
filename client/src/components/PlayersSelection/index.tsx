import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useSelector } from 'react-redux';

import { loadPlayersAction } from '../../components/PlayersSelection/actions';
import { RootState } from 'store/types';
import { Player } from 'types/player.types';

import { PlayerList } from '../PlayersList/index';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PlayerSelection from 'components/Gameweek/PlayerSelection';

type Props = {
  loadPlayersAction: typeof loadPlayersAction;
  players?: Player[];
};

const PlayersSelection = ({ loadPlayersAction, players }: Props) => {
  const [filter, setFilter] = useState({
    limit: 10,
    order_direction: 'DESC',
    order_field: 'player_score',
    position: undefined,
  });

  const [sortedSelect, setSortedSelect] = useState({
    value: 'player_score',
    label: 'Total points',
  });

  const [positionSelect, setPositionSelect] = useState({
    value: '',
    label: 'All players',
  });

  useEffect(() => {
    loadPlayersAction({ ...filter });
  }, [filter]);

  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const onFilterChange = (item: any) => {
    setSortedSelect(item);
    setFilter({ ...filter, order_field: item.value });
    loadPlayersAction({ ...filter });
  };
  const onPositionSelectChange = (item: any) => {
    setPositionSelect(item);
    setFilter({ ...filter, ...item.value });
    loadPlayersAction({ ...filter });
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
      items: [{ value: '', label: 'All players' }],
    },
    {
      type: 'group',
      name: 'By Position',
      items: [
        { value: { position: 1 }, label: 'Goalkeepers' },
        { value: '2', label: 'Defenders' },
        { value: '3', label: 'Midifilders' },
        { value: '4', label: 'Forwards' },
      ],
    },
    {
      type: 'group',
      name: 'By Team',
      items: [
        { value: { club_id: 1 }, label: 'Arsenal' },
        { value: '2', label: 'Aston Villa' },
        { value: '3', label: 'Bournemouth' },
        { value: '4', label: 'Brighton' },
        { value: '5', label: 'Burnley' },
        { value: '6', label: 'Chelsea' },
        { value: '7', label: 'Crystal Palace' },
        { value: '8', label: 'Everton' },
        { value: '9', label: 'Leicester' },
        { value: '10', label: 'Liverpool' },
        { value: '11', label: 'Man City' },
        { value: '12', label: 'Man Utd' },
        { value: '13', label: 'Newcastle' },
        { value: '14', label: 'Norwich' },
        { value: '15', label: 'Sheffield Utd' },
        { value: '16', label: 'Southampton' },
        { value: '17', label: 'Spurs' },
        { value: '18', label: 'Watford' },
        { value: '19', label: 'West Ham' },
        { value: '20', label: 'Wolves' },
      ],
    },
  ];

  return (
    <div className='bg-gray-300 px-4 py-4'>
      <h3 className='font-bold'>Player Selection</h3>
      <form>
        <div className='mt-2'>
          <Dropdown
            options={filteredBy as any}
            onChange={onPositionSelectChange}
            value={positionSelect}
          />
          <label className='font-bold'>
            <span>View</span>
          </label>
        </div>
        <div className='mt-2'>
          <label className='font-bold'>
            <span>Sorted by</span>
          </label>
          <Dropdown options={sortedBy} onChange={onFilterChange} value={sortedSelect} />
        </div>

        <div className='mt-2'>
          <label className='font-bold'>
            <span>Search</span>
          </label>
          <div>
            <input type='search' id='search' name='search' className='w-full' value='' />
          </div>
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
