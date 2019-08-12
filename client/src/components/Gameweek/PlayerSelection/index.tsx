import React from 'react';

import './styles.scss';

interface PlayerInfo {
  src: string;
  name: string;
  club: string;
}

const PlayerSelection = ({ src, name, club }: PlayerInfo) => {
  return (
    <div className='text-center relative'>
      <img src={src} className='player-img player-shadow' alt='player' />
      <div>
        <div className='player-name'>{name}</div>
        <div className='player-club'>{club}</div>
      </div>
    </div>
  );
};

export default PlayerSelection;
