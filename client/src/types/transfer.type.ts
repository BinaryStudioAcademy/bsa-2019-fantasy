import { Patch } from 'immer';

export type TransferType = {
  id: string;
  in_player: { id: string }; // PlayerType
  out_player: { id: string }; // PlayerType

  cost: number;

  immer_reverse: Patch[];
};
