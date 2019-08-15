import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';
import { Position } from 'types/player.types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { PlayerItem } from '../PlayerItem/index';
import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';
import { getFieldPlayersUniformUrl, getGoalkeepersUniformUrl } from 'helpers/images';
import info from 'assets/images/info.svg';

export const PlayerList = ({ players }: any) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const { GKP, DEF, MID, FWD } = Position;
  const goalkeepers = players.filter((player: any) => {
    return player.position === GKP ? true : false;
  });
  const defenders = players.filter((player: any) => {
    return player.position === DEF ? true : false;
  });
  const midfielders = players.filter((player: any) => {
    return player.position === MID ? true : false;
  });
  const forwards = players.filter((player: any) => {
    return player.position === FWD ? true : false;
  });
  return (
    <DndProvider backend={HTML5Backend}>
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
            id={player.id}
            name={player.second_name}
            club={clubs[player.club_id - 1].short_name}
            position={PlayerTypes.GOALKEEPER}
            price={player.player_price}
            score={player.player_score}
            info={info}
            imageURL={getGoalkeepersUniformUrl(clubs[player.club_id - 1].code)}
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
            id={player.id}
            name={player.second_name}
            club={clubs[player.club_id - 1].short_name}
            position={PlayerTypes.DEFENDER}
            price={player.player_price}
            score={player.player_score}
            info={info}
            imageURL={getFieldPlayersUniformUrl(clubs[player.club_id - 1].code)}
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
            id={player.id}
            name={player.second_name}
            club={clubs[player.club_id - 1].short_name}
            position={PlayerTypes.MIDDLEFIELDER}
            price={player.player_price}
            score={player.player_score}
            info={info}
            imageURL={getFieldPlayersUniformUrl(clubs[player.club_id - 1].code)}
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
            id={player.id}
            name={player.second_name}
            club={clubs[player.club_id - 1].short_name}
            position={PlayerTypes.FORWARD}
            price={player.player_price}
            score={player.player_score}
            info={info}
            imageURL={getFieldPlayersUniformUrl(clubs[player.club_id - 1].code)}
          />
        ))}
      </table>
    </DndProvider>
  );
};
