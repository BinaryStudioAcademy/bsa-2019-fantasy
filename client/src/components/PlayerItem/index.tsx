import React from 'react';
import { useDrag } from 'react-dnd';

import { PlayerType } from 'types/player.types';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';

type Props = {
  player: { player_stats: PlayerType; display: { src: string } };

  info: string;
  onOpenInfo?: (playerId: string, clubId: number) => any;
};

export const PlayerItem = ({ player, info, onOpenInfo }: Props) => {
  const { player_stats, display } = player;

  const clubName = useSelector(
    (state: RootState) => state.clubs.clubs[player_stats.club_id - 1].short_name,
  );

  const [, drag] = useDrag({
    item: {
      type: player_stats.position,
      ...player,
    },
  });

  return (
    <tr ref={drag} className='bg-white'>
      <td className='w-1/6' align='center' valign='middle'>
        {onOpenInfo && (
          <button
            className='p-1 flex justify-center opacity-50 hover:opacity-75'
            onClick={() => onOpenInfo(player_stats.id, player_stats.club_id)}
          >
            <img src={info} alt='info' />
          </button>
        )}
      </td>
      <td className='w-3/6' valign='middle'>
        <button className='flex flex-row'>
          <img className='w-8 mr-2 my-1' src={display.src} alt='player' />
          <div className='flex flex-col items-start justify-center'>
            <div className='w-20 text-left truncate'>{player_stats.second_name}</div>
            <div>
              <span className='mr-1'>{clubName}</span>
              <span>{player_stats.position}</span>
            </div>
          </div>
        </button>
      </td>
      <td className='w-1/6'>{player_stats.player_price}</td>
      <td className='w-1/6'>{player_stats.player_score}</td>
    </tr>
  );
};
