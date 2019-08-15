import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadPlayersAction } from '../../components/PlayersSelection/actions';
import { RootState } from 'store/types';
import { Player } from 'types/player.types';

import { PlayerList } from '../PlayersList/index';
import Dropdown from 'components/Dropdown';

type Props = {
  loadPlayersAction: typeof loadPlayersAction;
  players?: Player[];
};

const PlayersSelection = ({ loadPlayersAction, players }: Props) => {
  const [filter, setFilter] = useState({
    limit: 10,
    order_direction: 'DESC',
    order_field: 'player_score',
  });

  useEffect(() => {
    loadPlayersAction({...filter});
  }, []);

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

  // const filteredBy = [
  //   {
  //     type: 'group', name: 'Global', items: [
  //       { value: '', label: 'All players' }
  //     ]
  //   },
  //   {
  //     type: 'group', name: 'By Position', items: [
  //       { value: '1', label: 'Goalkeepers' },
  //       { value: '2', label: 'Defenders' },
  //       { value: '3', label: 'Midifilders' },
  //       { value: '4', label: 'Forwards' },
  //     ]
  //   },
  //   {
  //     type: 'group', name: 'By Team', items: [
  //       { value: '1', label: 'Arsenal' },
  //       { value: '2', label: 'Aston Villa' },
  //       { value: '3', label: 'Bournemouth' },
  //       { value: '4', label: 'Brighton' },
  //       { value: '5', label: 'Burnley' },
  //       { value: '6', label: 'Chelsea' },
  //       { value: '7', label: 'Crystal Palace' },
  //       { value: '8', label: 'Everton' },
  //       { value: '9', label: 'Leicester' },
  //       { value: '10', label: 'Liverpool' },
  //       { value: '11', label: 'Man City' },
  //       { value: '12', label: 'Man Utd' },
  //       { value: '13', label: 'Newcastle' },
  //       { value: '14', label: 'Norwich' },
  //       { value: '15', label: 'Sheffield Utd' },
  //       { value: '16', label: 'Southampton' },
  //       { value: '17', label: 'Spurs' },
  //       { value: '18', label: 'Watford' },
  //       { value: '19', label: 'West Ham' },
  //       { value: '20', label: 'Wolves' },
  //     ]
  //   }
  // ]

  const onFilterChange = ({ value }: any) => {
    setFilter({ ...filter, order_field: value });
    console.log(filter);
    loadPlayersAction({...filter});
  };

  return (
    <div className='bg-gray-300 px-4 py-4'>
      <h3 className='font-bold'>Player Selection</h3>
      <form>
        <div className='mt-2'>
          {/* <Dropdown options={filteredBy} onChange={onFilterChange} /> */}
          <label className='font-bold'>
            <span>View</span>
          </label>
          <div>
            <select id='filter' className='w-full'>
              <optgroup label='Global'>
                <option value='all' aria-selected='true'>
                  All players
                </option>
              </optgroup>
              <optgroup label='By Position'>
                <option value='goalkeepers' aria-selected='false'>
                  Goalkeepers
                </option>
                <option value='defenders' aria-selected='false'>
                  Defenders
                </option>
                <option value='mididilders' aria-selected='false'>
                  Midfielders
                </option>
                <option value='forwards' aria-selected='false'>
                  Forwards
                </option>
              </optgroup>
              <optgroup label='By Team'>
                <option value='Arsenal' aria-selected='false'>
                  Arsenal
                </option>
                <option value='Aston Villa' aria-selected='false'>
                  Aston Villa
                </option>
                <option value='Bournemouth' aria-selected='false'>
                  Bournemouth
                </option>
                <option value='Brighton' aria-selected='false'>
                  Brighton
                </option>
                <option value='Burnley' aria-selected='false'>
                  Burnley
                </option>
                <option value='Chelsea' aria-selected='false'>
                  Chelsea
                </option>
                <option value='Crystal Palace' aria-selected='false'>
                  Crystal Palace
                </option>
                <option value='Everton' aria-selected='false'>
                  Everton
                </option>
                <option value='Leicester' aria-selected='false'>
                  Leicester
                </option>
                <option value='Liverpool' aria-selected='false'>
                  Liverpool
                </option>
                <option value='Man City' aria-selected='false'>
                  Man City
                </option>
                <option value='Man Utd' aria-selected='false'>
                  Man Utd
                </option>
                <option value='Newcastle' aria-selected='false'>
                  Newcastle
                </option>
                <option value='Norwich' aria-selected='false'>
                  Norwich
                </option>
                <option value='Sheffield Utd' aria-selected='false'>
                  Sheffield Utd
                </option>
                <option value='Southampton' aria-selected='false'>
                  Southampton
                </option>
                <option value='Spurs' aria-selected='false'>
                  Spurs
                </option>
                <option value='Watford' aria-selected='false'>
                  Watford
                </option>
                <option value='West Ham' aria-selected='false'>
                  West Ham
                </option>
                <option value='Wolves' aria-selected='false'>
                  Wolves
                </option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className='mt-2'>
          <label className='font-bold'>
            <span>Sorted by</span>
          </label>
          <Dropdown options={sortedBy} onChange={onFilterChange} />
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