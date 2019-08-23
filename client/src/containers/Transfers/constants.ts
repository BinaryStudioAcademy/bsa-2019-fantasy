import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';

export const getPitch = () => {
  return [
    ...Array(2).fill({ accept: PlayerTypes.GOALKEEPER }),
    ...Array(5).fill({ accept: PlayerTypes.DEFENDER }),
    ...Array(5).fill({ accept: PlayerTypes.MIDDLEFIELDER }),
    ...Array(3).fill({ accept: PlayerTypes.FORWARD }),
  ].map((v) => ({ ...v, lastDroppedItem: null }));
};

export const DEFAULT_TRANSFER_COST = 4;
