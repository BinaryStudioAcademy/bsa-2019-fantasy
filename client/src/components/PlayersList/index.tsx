import React from 'react';
import { PlayerItem } from '../PlayerItem/index';
import info from '../../assets/images/info.svg';
import shirt from '../../assets/images/shirt_8-66.png';

export const PlayerList = () => {
  return (
    <table className='w-full'>
      <tr className='bg-yellow-400'>
        <th className='w-1/6' align='left'>&nbsp;</th>
        <th className='w-3/6' align='left'>Goalkeepers</th>
        <th className='w-1/6' align='left'>£</th>
        <th className='w-1/6' align='left'>**</th>
      </tr>
      <PlayerItem
        name='Kepa'
        club='CHE'
        position='GKP'
        price='5.0'
        score='10'
        info={info}
        shirt={shirt}
      />
      <PlayerItem
        name='Caballero'
        club='CHE'
        position='GKP'
        price='5.5'
        score='4'
        info={info}
        shirt={shirt}
      />
      <tr className='bg-green-400'>
        <th className='w-1/6' align='left'>&nbsp;</th>
        <th className='w-3/6' align='left'>Defenders</th>
        <th className='w-1/6' align='left'>£</th>
        <th className='w-1/6' align='left'>**</th>
      </tr>
      <PlayerItem
        name='Alonso'
        club='CHE'
        position='DEF'
        price='5.0'
        score='10'
        info={info}
        shirt={shirt}
      />
      <tr className='bg-blue-400'>
        <th className='w-1/6' align='left'>&nbsp;</th>
        <th className='w-3/6' align='left'>Midfielders</th>
        <th className='w-1/6' align='left'>£</th>
        <th className='w-1/6' align='left'>**</th>
      </tr>
      <PlayerItem
        name='Kante'
        club='CHE'
        position='MID'
        price='5.0'
        score='10'
        info={info}
        shirt={shirt}
      />
      <tr className='bg-red-400'>
        <th className='w-1/6' align='left'>&nbsp;</th>
        <th className='w-3/6' align='left'>Forwards</th>
        <th className='w-1/6' align='left'>£</th>
        <th className='w-1/6' align='left'>**</th>
      </tr>
      <PlayerItem
        name='Giroud'
        club='CHE'
        position='FWD'
        price='5.0'
        score='10'
        info={info}
        shirt={shirt}
      />
    </table>
  );
};
