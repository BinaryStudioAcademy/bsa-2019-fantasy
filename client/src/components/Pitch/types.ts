import { GameweekHistoryType } from 'types/gameweekHistory.type';

export type PitchPlayerType = GameweekHistoryType & {
  display: {
    src: string;
  };
};
