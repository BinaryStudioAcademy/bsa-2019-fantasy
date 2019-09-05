import { Patch } from 'immer';

import { DisplayPlayerType, PitchPlayerType } from 'components/Pitch/types';

/**
 * Place specific logic in this function
 * @returns Void or function which will be executed after re-setting all players
 * @param target Value of player cell on which `player` was dropped
 * @param player Value which was dropped
 * @param immer_reverse Patch which can be used to reverse changes in pitch via `immer.applyPatches(immer_reverse)`
 * @param isNewPlayer true if `player` was new to the list
 */
export type PlayerDropHandler = (
  target: DisplayPlayerType | null,
  player: DisplayPlayerType,
  immer_reverse: Patch[],
  isNewPlayer: boolean,
) => ((newPlayers: PitchPlayerType[]) => void) | void;
