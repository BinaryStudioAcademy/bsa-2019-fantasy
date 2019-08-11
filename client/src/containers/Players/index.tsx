import React from 'react';
import { Link } from 'react-router-dom';
import { Option } from 'react-dropdown';

import Dropdown from 'components/Dropdown';
import PlayerHighlight from 'components/PlayerHighlight';
import SearchBar from 'components/SearchBar';

import './styles.scss';

const PlayersPage = () => {
  const allPlayers = [
    { shirt: '/images/uniforms/field-players/shirt_1-66.png', name: 'Lionel Messi' },
    { shirt: '/images/uniforms/field-players/shirt_3-66.png', name: 'Mario Balotelli' },
    {
      shirt: '/images/uniforms/field-players/shirt_4-66.png',
      name: 'Zlatan Ibrahimovic',
    },
    { shirt: '/images/uniforms/field-players/shirt_1-66.png', name: 'Lionelo Messi' },
    {
      shirt: '/images/uniforms/field-players/shirt_3-66.png',
      name: 'Mariotto Balotelli',
    },
    {
      shirt: '/images/uniforms/field-players/shirt_4-66.png',
      name: 'Zlatanus Ibrahimovic',
    },
  ];

  const onFilterChange = (opt: Option) => console.log(opt);

  const renderColumn = () => (
    <div className='columnByScore w-1/4 p-6'>
      <div className='column-header mb-4 font-semibold text-xs text-secondary2'>
        All Players
      </div>
      {allPlayers.map((player) => (
        <div className='item flex items-center my-3' key={player.name}>
          <img className='w-5 mr-4' src={player.shirt} alt='Shirt' />
          <Link className='mr-4 font-semibold' to='#'>
            {player.name}
          </Link>
          <button className='w-4 h-4 justify-center leading-none flex ml-auto bg-background rounded-full text-xs font-semibold'>
            i
          </button>
        </div>
      ))}
    </div>
  );

  const dropdownFilters = [
    {
      name: 'Player selection',
      options: ['Lionel Messi', 'Mario Balotelli', 'Christiano Ronaldo'],
      onChange: onFilterChange,
      render: renderColumn,
    },
    {
      name: 'SortBy',
      options: ['Total score', 'Last rank'],
      onChange: onFilterChange,
      render: renderColumn,
    },
    {
      name: 'Price',
      options: ['High to low', 'Low to high'],
      onChange: onFilterChange,
      render: renderColumn,
    },
    {
      name: 'Club',
      options: ['Arsenal', 'Manchester United', 'Chelsea'],
      onChange: onFilterChange,
      render: renderColumn,
    },
  ];

  return (
    <>
      <PlayerHighlight />

      <section className='allStats my-6'>
        <div className='filters text-sm flex my-6'>
          {dropdownFilters.map(({ name, options, onChange }, index) => (
            <div className='w-1/4 flex justify-between' key={name}>
              <Dropdown {...{ placeholder: name, options, onChange }} />
              {index === 3 && <SearchBar />}
            </div>
          ))}
        </div>
        <div className='columnsWrapper flex bg-white shadow rounded my-4'>
          {dropdownFilters.map((item) => item.render())}
        </div>
      </section>
    </>
  );
};

export default PlayersPage;
