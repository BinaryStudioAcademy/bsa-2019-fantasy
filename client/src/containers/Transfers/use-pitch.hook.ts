import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store/types';
import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';
import { getGoalkeepersUniformUrl, getFieldPlayersUniformUrl } from 'helpers/images';

import { getPitch } from './constants';

export const usePitchPlayers = () => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const players = useSelector((state: RootState) => state.gameweeks.gameweeks_history);
  const [pitchPlayers, setPitch] = useState<{ accept: string; lastDroppedItem: any }[]>(
    getPitch(),
  );

  useEffect(() => {
    if (players.length) {
      setPitch(
        players.map((p) => {
          const { position, id, second_name, club_id, player_score } = p.player_stats;

          return {
            accept: position,
            lastDroppedItem: {
              ...p.player_stats,
              id: id,
              name: second_name,
              club: clubs[club_id - 1].short_name,
              points: player_score,
              type: position,
              src:
                position === PlayerTypes.GOALKEEPER
                  ? getGoalkeepersUniformUrl(clubs[club_id - 1].code)
                  : getFieldPlayersUniformUrl(clubs[club_id - 1].code),
            },
          };
        }),
      );
    }
  }, [players]);

  return { pitchPlayers, setPitch };
};
