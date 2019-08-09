import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlayerHighlight from 'components/PlayerHighlight';
import Dropdown from 'components/Dropdown';

import './styles.scss';
import { placeholder } from '@babel/types';

const PlayersPage = () => {
  const allPlayers = [
    { shirt: '/images/uniforms/field-players/shirt_1-66.png', name: 'Lionel Messi' },
    { shirt: '/images/uniforms/field-players/shirt_3-66.png', name: 'Mario Balotelli' },
    {
      shirt: '/images/uniforms/field-players/shirt_4-66.png',
      name: 'Zlatan Ibrahimovic',
    },
    { shirt: '/images/uniforms/field-players/shirt_1-66.png', name: 'Lionel Messi' },
    { shirt: '/images/uniforms/field-players/shirt_3-66.png', name: 'Mario Balotelli' },
    {
      shirt: '/images/uniforms/field-players/shirt_4-66.png',
      name: 'Zlatan Ibrahimovic',
    },
  ];

  const onFilterChange = (e: any) => console.log(e);

  const renderColumn = () => (
    <div className='columnByScore w-1/4 p-6'>
      <div className='column-header mb-4 font-semibold text-xs text-secondary2'>
        All Players
      </div>
      {allPlayers.map((player) => (
        <div className='item flex items-center my-3'>
          <img className='w-5 mr-4' src={player.shirt} alt='Shirt' />
          <a className='mr-4 font-semibold' href='#'>
            {player.name}
          </a>
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
        <div className='filters flex my-6'>
          {dropdownFilters.map((filter) => (
            <div className='w-1/4 flex'>
              <Dropdown {...filter} placeholder={filter.name} />
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
