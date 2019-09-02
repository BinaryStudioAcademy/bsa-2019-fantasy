import produce from 'immer';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { RootState } from 'store/types';
import { PitchPlayerType } from './types';
import { GameweekHistoryType } from 'types/gameweekHistory.type';
import { PlayerTypes, PlayerPosition } from 'components/Gameweek/PlayerSelection/types';

import { getGoalkeepersUniformUrl, getFieldPlayersUniformUrl } from 'helpers/images';
import { getPitch } from './helpers';
import { Club } from 'types/club.type';
import { PlayerType } from 'types/player.types';
import { UpcomingFixture } from 'types/fixture.types';

type AbstractPitchPlayer<P> = {
  type: PlayerPosition;
  item: (P & { display: { src: string } } & { upcomingFixture: UpcomingFixture }) | null;
};

export const transformToPitchPlayers = <P extends { player_stats: PlayerType }>(
  players: P[],
  clubs: Club[],
): AbstractPitchPlayer<P>[] => {
  return getPitch(players).map((p) =>
    p.item === null
      ? p
      : produce(p, (draft: AbstractPitchPlayer<P>) => {
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
        }),
  ) as AbstractPitchPlayer<P>[];
};

export const usePitchPlayers = (players: GameweekHistoryType[] = []) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const [pitchPlayers, setPitch] = useState<PitchPlayerType[]>([]);

  useEffect(() => {
    setPitch(transformToPitchPlayers(players, clubs));
  }, [players.length]);

  return { pitchPlayers, setPitch };
};
