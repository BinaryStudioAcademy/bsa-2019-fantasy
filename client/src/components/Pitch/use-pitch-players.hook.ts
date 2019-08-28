import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { RootState } from 'store/types';
import { PitchPlayerType } from './types';
import { GameweekHistoryType } from 'types/gameweekHistory.type';
import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';

import { getGoalkeepersUniformUrl, getFieldPlayersUniformUrl } from 'helpers/images';
import { getPitch } from './helpers';
import produce from 'immer';

export const usePitchPlayers = (players: GameweekHistoryType[]) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const [pitchPlayers, setPitch] = useState<PitchPlayerType[]>([]);

  useEffect(() => {
    setPitch(
      getPitch(players).map((p) =>
        p.item === null
          ? (p as PitchPlayerType)
          : (produce(p, (draft: PitchPlayerType) => {
              if (draft.item) {
                draft.item.display = {
                  src:
                    draft.type === PlayerTypes.GOALKEEPER
                      ? getGoalkeepersUniformUrl(
                          clubs[draft.item.player_stats.club_id - 1].code,
                        )
                      : getFieldPlayersUniformUrl(
                          clubs[draft.item.player_stats.club_id - 1].code,
                        ),
                };
              }
            }) as PitchPlayerType),
      ),
    );
  }, [players.length]);

  return { pitchPlayers, setPitch };
};
