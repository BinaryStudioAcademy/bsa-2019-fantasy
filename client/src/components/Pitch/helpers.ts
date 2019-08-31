import { PlayerPosition } from 'components/Gameweek/PlayerSelection/types';
import { categorizePlayers } from 'helpers/categorizePlayers';
import { AbstractPlayerType } from 'types/player-with-position.interface';

export const typeAmountMap: [PlayerPosition, number][] = [
  ['GKP', 2],
  ['DEF', 5],
  ['MID', 5],
  ['FWD', 3],
];

export const getPitch = <T extends AbstractPlayerType>(players: T[] = []) => {
  const categorized = categorizePlayers(players);

  const team = typeAmountMap.flatMap<{
    type: PlayerPosition;
    item: T | null;
  }>(([type, amount]) => {
    let emptyPlayersAmount = amount - categorized[type].length;
    if (emptyPlayersAmount < 0) {
      // eslint-disable-next-line no-console
      console.error('Seems like we have some malformed team right here:', categorized);
      emptyPlayersAmount = 0;
    }

    return categorized[type]
      .map((p) => ({ item: p }))
      .concat(Array(emptyPlayersAmount).fill({ item: null }))
      .map((p) => ({ ...p, type }));
  });

  return team;
};
