import { GameweekHistoryType } from 'types/gameweekHistory.type';
import { PlayerPosition } from 'components/Gameweek/PlayerSelection/types';
import { UpcomingFixture } from 'types/fixture.types';

export type DisplayPlayerType = GameweekHistoryType & {
  display: {
    src: string;
    highlight?: string;
  };
  upcomingFixture: UpcomingFixture;
};

export type PitchPlayerType = {
  type: PlayerPosition;
  accept: PlayerPosition[];
  item: DisplayPlayerType | null;
};
