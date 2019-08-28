import { GameweekHistoryType } from 'types/gameweekHistory.type';
import { PlayerPosition } from 'components/Gameweek/PlayerSelection/types';

export type DisplayPlayerType = GameweekHistoryType & {
  display: {
    src: string;
  };
};

export type PitchPlayerType = {
  type: PlayerPosition;
  item: DisplayPlayerType | null;
};
