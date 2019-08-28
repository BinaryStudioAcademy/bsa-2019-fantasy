export const PlayerTypes = {
  GOALKEEPER: 'GKP' as const,
  FORWARD: 'FWD' as const,
  DEFENDER: 'DEF' as const,
  MIDDLEFIELDER: 'MID' as const,
};

export type PlayerPosition = typeof PlayerTypes[keyof typeof PlayerTypes];
