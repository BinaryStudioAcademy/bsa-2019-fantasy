import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';

export const getPitch = () => {
  return [
    {
      accept: PlayerTypes.GOALKEEPER,
      lastDroppedItem: {
        type: PlayerTypes.GOALKEEPER,
      },
    },

    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.DEFENDER,
      },
    },

    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.DEFENDER,
      },
    },
    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.DEFENDER,
      },
    },
    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.DEFENDER,
      },
    },

    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },

    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },
    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },

    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },
    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.FORWARD,
      },
    },

    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.FORWARD,
      },
    },
  ];
};

export const getBench = () => {
  return [
    {
      accept: [PlayerTypes.GOALKEEPER],
      lastDroppedItem: {
        type: PlayerTypes.GOALKEEPER,
      },
    },
    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.DEFENDER,
      },
    },
    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },
    {
      accept: [PlayerTypes.DEFENDER, PlayerTypes.MIDDLEFIELDER, PlayerTypes.FORWARD],
      lastDroppedItem: {
        type: PlayerTypes.FORWARD,
      },
    },
  ];
};
