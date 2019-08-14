import React, { useState } from 'react';
import { PlayerList } from '../PlayersList/index';
import Dropdown from 'components/Dropdown';

export const PlayersSelection = ({ players }: any) => {
  const [filter, setFilter] = useState({
    order_by: 'player_price',
  });

  // useEffect(() => {
  //   const filter = { limit: 10 };
  //   loadPlayersAction(filter);
  // }, []);

  const options = ['one', 'two', 'three'];
  const onFilterPriceChange = ({ value }: any) => {
    setFilter({ ...filter, order_by: value });
  };
  return (
    <div className='bg-gray-300 px-4 py-4'>
      <h3 className='font-bold'>Player Selection</h3>
      <form>
        <Dropdown options={options} onChange={onFilterPriceChange} />
        <div className='mt-2'>
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
          <div>
            <select id='sort' className='w-full'>
              <option value='total_points' aria-selected='false'>
                Total points
              </option>
              <option value='price' aria-selected='false'>
                Price
              </option>
              <option value='goals' aria-selected='false'>
                Goals
              </option>
              <option value='assists' aria-selected='false'>
                Assists
              </option>
              <option value='missed_passes' aria-selected='false'>
                Missed passes
              </option>
              <option value='goals_conceded' aria-selected='false'>
                Goals conceded
              </option>
              <option value='saves' aria-selected='false'>
                Saves
              </option>
              <option value='yellow_cards' aria-selected='false'>
                Yellow cards
              </option>
              <option value='red_cards' aria-selected='false'>
                Red cards
              </option>
            </select>
          </div>
        </div>

        <div className='mt-2'>
          <label className='font-bold'>
            <span>Search</span>
          </label>
          <div>
            <input type='search' id='search' name='search' className='w-full' value='' />
            <span></span>
          </div>
        </div>
      </form>

      <p className='w-full mt-4 text-center'>
        <strong>6</strong> players shown
      </p>

      <PlayerList players={players} />
    </div>
  );
};
