import { TransferType } from 'types/transfer.type';
import {
  TransferAction,
  ADD_TRANSFER,
  REMOVE_TRANSFER,
  ADD_CHANGE,
  REMOVE_CHANGE,
  EMPTY_CHANGES,
  MODIFY_TRANSFER,
  EMPTY_TRANSFERS,
} from './action.type';
import { Patch } from 'immer';
import { shallowEqual } from 'react-redux';

type State = {
  transfers: TransferType[];
  changes: Patch[];
};

const initialState: State = {
  transfers: [],
  changes: [],
};

export default (state = initialState, action: TransferAction) => {
  switch (action.type) {
    case ADD_TRANSFER:
      const { transfers } = state;
      const newTransfer = action.payload;

      const reversedTransferIdx = transfers.findIndex(
        (t) =>
          t.in_player === newTransfer.out_player &&
          t.out_player === newTransfer.in_player,
      );
      const newTransfers =
        reversedTransferIdx === -1
          ? [...transfers, newTransfer]
          : [
              ...transfers.slice(0, reversedTransferIdx),
              ...transfers.slice(reversedTransferIdx + 1),
            ];

      return { ...state, transfers: newTransfers };

    case MODIFY_TRANSFER:
      return {
        ...state,
        transfers: state.transfers.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };

    case REMOVE_TRANSFER:
      return {
        ...state,
        transfers: state.transfers.filter((t) => t.id !== action.payload),
      };

    case EMPTY_TRANSFERS:
      return {
        ...state,
        transfers: [],
        changes: [],
      };

    case ADD_CHANGE:
      return {
        ...state,
        changes: [...state.changes, ...action.payload].flat() as Patch[],
      };

    case EMPTY_CHANGES:
      return { ...state, changes: [] };

    case REMOVE_CHANGE:
      return {
        ...state,
        changes: state.changes.filter((c) =>
          action.payload.reduce(
            (prev, pc) =>
              prev &&
              !(
                c.op === pc.op &&
                c.path[0] === pc.path[0] &&
                shallowEqual(c.value, pc.value)
              ),
            true as boolean,
          ),
        ),
      };

    default:
      return state;
  }
};
