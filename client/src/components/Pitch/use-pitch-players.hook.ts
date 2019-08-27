import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { RootState } from 'store/types';
import { PitchPlayerType } from './types';
import { GameweekHistoryType } from 'types/gameweekHistory.type';
import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';

import { getGoalkeepersUniformUrl, getFieldPlayersUniformUrl } from 'helpers/images';

export const usePitchPlayers = (players: GameweekHistoryType[]) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const [pitchPlayers, setPitch] = useState<(PitchPlayerType | null)[]>([]);

  useEffect(() => {
    if (players.length) {
      setPitch(
        players
          .map((p) => ({
            ...p,
            display: {
              src:
                p.player_stats.position === PlayerTypes.GOALKEEPER
                  ? getGoalkeepersUniformUrl(clubs[p.player_stats.club_id - 1].code)
                  : getFieldPlayersUniformUrl(clubs[p.player_stats.club_id - 1].code),
            },
          }))
          .concat(Array(15 - players.length).fill(null)),
      );
    }
  }, [players.length]);

  return { pitchPlayers, setPitch };
};
