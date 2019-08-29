import { PlayerTypes, PlayerPosition } from 'components/Gameweek/PlayerSelection/types';
import { AbstractPlayerType } from 'types/player-with-position.interface';

export const categorizePlayers = <T extends AbstractPlayerType>(
  players: T[],
): Record<PlayerPosition, T[]> => {
  return {
    GKP: players.filter((p) => p.player_stats.position === PlayerTypes.GOALKEEPER),
    DEF: players.filter((p) => p.player_stats.position === PlayerTypes.DEFENDER),
    MID: players.filter((p) => p.player_stats.position === PlayerTypes.MIDDLEFIELDER),
    FWD: players.filter((p) => p.player_stats.position === PlayerTypes.FORWARD),
  };
};
