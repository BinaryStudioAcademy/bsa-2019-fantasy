import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';

export const getPitch = () => {
  return [
    {
      accept: PlayerTypes.GOALKEEPER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: null,
    },
    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: null,
    },
    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: null,
    },
    {
      accept: PlayerTypes.FORWARD,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.FORWARD,
      lastDroppedItem: null,
    },
  ];
};

export const getBench = () => {
  return [
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: null,
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: null,
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: null,
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: null,
    },
  ];
};
