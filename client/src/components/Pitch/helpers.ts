import { PlayerPosition } from 'components/Gameweek/PlayerSelection/types';
import { categorizePlayers } from 'helpers/categorizePlayers';
import { AbstractPlayerType } from 'types/player-with-position.interface';

export const getPitch = <T extends AbstractPlayerType>(players: T[] = []) => {
  const typeAmountMap: [PlayerPosition, number][] = [
    ['GKP', 2],
    ['DEF', 5],
    ['MID', 5],
    ['FWD', 3],
  ];

  const categorized = categorizePlayers(players);

  const team = typeAmountMap.flatMap<{
    type: PlayerPosition;
    item: T | null;
  }>(([type, amount]) =>
    categorized[type]
      .map((p) => ({ item: p }))
      .concat(Array(amount - categorized[type].length).fill({ item: null }))
      .map((p) => ({ ...p, type })),
  );

  return team;
};
