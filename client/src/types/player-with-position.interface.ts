import { PlayerPosition } from 'components/Gameweek/PlayerSelection/types';

export interface AbstractPlayerType {
  player_stats: {
    position: PlayerPosition;
  };
}
