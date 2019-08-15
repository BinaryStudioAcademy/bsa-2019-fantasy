import React from 'react';
import { PlayerItem } from '../PlayerItem/index';
import info from '../../assets/images/info.svg';
import shirt from '../../assets/images/shirt_8-66.png';
import { Player } from 'types/player.types';

export const PlayerList = ({ players }: any) => {
  const clubs = {
    '1': 'ARS',
    '2': 'AVL',
    '3': 'BOU',
    '4': 'BHA',
    '5': 'BUR',
    '6': 'CHE',
    '7': 'CRY',
    '8': 'EVE',
    '9': 'LEI',
    '10': 'LIV',
    '11': 'MCI',
    '12': 'MUN',
    '13': 'NEW',
    '14': 'NOR',
    '15': 'SHU',
    '16': 'SOU',
    '17': 'TOT',
    '18': 'WAT',
    '19': 'WHU',
    '20': 'WOL',
  }

  const goalkeepers = players.filter((player: any) => {
    return player.position === '1' ? true : false;
  });
  const defenders = players.filter((player: any) => {
    return player.position === '2' ? true : false;
  });
  const midfielders = players.filter((player: any) => {
    return player.position === '3' ? true : false;
  });
  const forwards = players.filter((player: any) => {
    return player.position === '4' ? true : false;
  });

  return (
    <table className='w-full'>
      <tr className='bg-yellow-400'>
        <th className='w-1/6' align='left'>
          &nbsp;
        </th>
        <th className='w-3/6' align='left'>
          Goalkeepers
        </th>
        <th className='w-1/6' align='left'>
          £
        </th>
        <th className='w-1/6' align='left'>
          **
        </th>
      </tr>
      {goalkeepers.map((player: any) => (
        <PlayerItem
          name={player.second_name}
          club={player.club_id}
          position='GKP'
          price={player.player_price}
          score={player.player_score}
          info={info}
          shirt={shirt}
        />
      ))}
      <tr className='bg-green-400'>
        <th className='w-1/6' align='left'>
          &nbsp;
        </th>
        <th className='w-3/6' align='left'>
          Defenders
        </th>
        <th className='w-1/6' align='left'>
          £
        </th>
        <th className='w-1/6' align='left'>
          **
        </th>
      </tr>
      {defenders.map((player: any) => (
        <PlayerItem
          name={player.second_name}
          club={player.club_id}
          position='DEF'
          price={player.player_price}
          score={player.player_score}
          info={info}
          shirt={shirt}
        />
      ))}
      <tr className='bg-blue-400'>
        <th className='w-1/6' align='left'>
          &nbsp;
        </th>
        <th className='w-3/6' align='left'>
          Midfielders
        </th>
        <th className='w-1/6' align='left'>
          £
        </th>
        <th className='w-1/6' align='left'>
          **
        </th>
      </tr>
      {midfielders.map((player: any) => (
        <PlayerItem
          name={player.second_name}
          club={player.club_id}
          position='MID'
          price={player.player_price}
          score={player.player_score}
          info={info}
          shirt={shirt}
        />
      ))}
      <tr className='bg-red-400'>
        <th className='w-1/6' align='left'>
          &nbsp;
        </th>
        <th className='w-3/6' align='left'>
          Forwards
        </th>
        <th className='w-1/6' align='left'>
          £
        </th>
        <th className='w-1/6' align='left'>
          **
        </th>
      </tr>
      {forwards.map((player: any) => (
        <PlayerItem
          name={player.second_name}
          club={player.club_id}
          position='FWD'
          price={player.player_price}
          score={player.player_score}
          info={info}
          shirt={shirt}
        />
      ))}
    </table>
  );
};
