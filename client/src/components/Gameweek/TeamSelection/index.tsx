import React from 'react';
import uuidv4 from 'uuid/v4';

import Player from '../PlayerSelection';

import './styles.scss';

// Mock Data
const goalkeeper = [
  {
    src: 'images/uniforms/goalkeepers/shirt_14_1-66.png',
    name: 'Allison',
    club: 'SOU (A)',
  },
];

const defenders = [
  {
    src: 'images/uniforms/field-players/shirt_14-66.png',
    name: 'van Dijk',
    club: 'SOU (A)',
  },

  {
    src: 'images/uniforms/field-players/shirt_14-66.png',
    name: 'Aleksandr Arnold',
    club: 'SOU (A)',
  },

  {
    src: 'images/uniforms/field-players/shirt_43-66.png',
    name: 'Walker',
    club: 'TOT (H)',
  },

  {
    src: 'images/uniforms/field-players/shirt_3-66.png',
    name: 'David Luiz',
    club: 'BUR (H)',
  },
];

const middlefilders = [
  {
    src: 'images/uniforms/field-players/shirt_57-66.png',
    name: 'Doucoure',
    club: 'EVE (A)',
  },

  {
    src: 'images/uniforms/field-players/shirt_1-66.png',
    name: 'Pogba',
    club: 'WOL (A)',
  },

  {
    src: 'images/uniforms/field-players/shirt_13-66.png',
    name: 'Perez',
    club: 'CHE (A)',
  },

  {
    src: 'images/uniforms/field-players/shirt_39-66.png',
    name: 'Moutinho',
    club: 'MUN (H)',
  },
];

const forwards = [
  {
    src: 'images/uniforms/field-players/shirt_1-66.png',
    name: 'Rashford',
    club: 'WOL (A)',
  },

  {
    src: 'images/uniforms/field-players/shirt_57-66.png',
    name: 'Deeney',
    club: 'EVE (A)',
  },
];

const bench = [
  {
    src: 'images/uniforms/goalkeepers/shirt_43_1-66.png',
    name: 'Ederson',
    club: 'TOT (A)',
  },

  {
    src: 'images/uniforms/field-players/shirt_43-66.png',
    name: 'Laporte',
    club: 'TOT (H)',
  },

  {
    src: 'images/uniforms/field-players/shirt_31-66.png',
    name: 'Townsed',
    club: 'SHU (A)',
  },

  {
    src: 'images/uniforms/field-players/shirt_11-66.png',
    name: 'Calvert-Lewin',
    club: 'WAT (H)',
  },
];

const TeamSelection = () => {
  return (
    <div className='relative team-container'>
      {/* Goalkeeper */}
      <div className='flex justify-around absolute team'>
        {goalkeeper.map((el) => (
          <Player key={uuidv4()} src={el.src} name={el.name} club={el.club} />
        ))}
      </div>
      {/* Defenders */}
      <div className='flex justify-between top-20 absolute team'>
        {defenders.map((el) => (
          <Player key={uuidv4()} src={el.src} name={el.name} club={el.club} />
        ))}
      </div>
      {/* Middlefilders */}
      <div className='flex justify-between top-40 absolute team'>
        {middlefilders.map((el) => (
          <Player key={uuidv4()} src={el.src} name={el.name} club={el.club} />
        ))}
      </div>
      {/* Forwards */}
      <div className='flex justify-around top-60 absolute team'>
        {forwards.map((el) => (
          <Player key={uuidv4()} src={el.src} name={el.name} club={el.club} />
        ))}
      </div>
      {/* Bench */}
      <div className='flex justify-around top-80 left-0 w-full m-3 absolute team'>
        {bench.map((el) => (
          <Player key={uuidv4()} src={el.src} name={el.name} club={el.club} />
        ))}
      </div>
      <img src='images/field.svg' alt='field' className='field' />
      <div className='w-full h-40 bg-gray-400 rounded-r-sm' />
    </div>
  );
};

export default TeamSelection;
