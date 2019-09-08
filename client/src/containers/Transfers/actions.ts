import uuidv4 from 'uuidv4';
import produce, { Patch } from 'immer';
import { feedback } from 'react-feedbacker';

import * as transferService from 'services/transferService';
import { setUser, loadCurrentUser } from 'containers/Profile/actions';
import { currentGameweekSelector } from 'store/selectors/current-gameweek.selector';

import {
  TransferAction,
  ADD_TRANSFER,
  REMOVE_TRANSFER,
  AsyncTransferAction,
  ADD_CHANGE,
  REMOVE_CHANGE,
  EMPTY_CHANGES,
  MODIFY_TRANSFER,
  EMPTY_TRANSFERS,
} from './action.type';
import { TransferType } from 'types/transfer.type';
import { DEFAULT_TRANSFER_COST } from './constants';
import { fetchGameweekHistory } from 'containers/Routing/fetchGameweeks/actions';

export const addTransferPlain = (transfer: Omit<TransferType, 'id'>): TransferAction => ({
  type: ADD_TRANSFER,
  payload: { ...transfer, id: uuidv4() },
});

export const removeTransferPlain = (transferId: TransferType['id']): TransferAction => ({
  type: REMOVE_TRANSFER,
  payload: transferId,
});

export const modifyTransferPlain = (transfer: TransferType): TransferAction => ({
  type: MODIFY_TRANSFER,
  payload: transfer,
});

export const emptyTransfers = (): TransferAction => ({
  type: EMPTY_TRANSFERS,
});

export const addChange = (changes: Patch[]): TransferAction => ({
  type: ADD_CHANGE,
  payload: changes,
});

export const removeChange = (changes: Patch[]): TransferAction => ({
  type: REMOVE_CHANGE,
  payload: changes,
});

export const emptyChanges = (): TransferAction => ({
  type: EMPTY_CHANGES,
});

export const applyTransfers = (): AsyncTransferAction => async (
  dispatch,
  getRootState,
) => {
  const state = getRootState();

  try {
    const currentGameweek = currentGameweekSelector(state);

    if (!currentGameweek) throw new Error('Could not find the current gameweek');

    const res = await transferService.postTransfers(
      state.transfers.transfers,
      currentGameweek.id,
    );
    feedback.success(res.message || res);

    dispatch(emptyTransfers());
    dispatch<any>(loadCurrentUser(true));
    dispatch<any>(fetchGameweekHistory(state.profile.user!.id, currentGameweek.id));
  } catch (err) {
    feedback.error(err.message || err);
  }
};

type TransferLite = {
  in_player_id: string;
  out_player_id: string;

  immer_reverse: Patch[];
};

export const removeTransfer = (transfer: TransferType): AsyncTransferAction => (
  dispatch,
  getRootState,
) => {
  const {
    profile: { user },
    transfers: { transfers },
  } = getRootState();

  if (user) {
    if (transfer.cost === 0) {
      const notFreeTransfer = transfers.find((t) => t.cost > 0);

      if (notFreeTransfer) {
        dispatch(modifyTransferPlain({ ...notFreeTransfer, cost: 0 }));
      } else {
        dispatch<any>(setUser({ ...user, free_transfers: user.free_transfers + 1 }));
      }
    }

    dispatch(removeTransferPlain(transfer.id));
  }
};

export const modifyTransfer = (transfer: TransferLite): AsyncTransferAction => (
  dispatch,
  getRootState,
) => {
  const { transfers } = getRootState().transfers;

  const transferInToModify = transfers.find(
    (t) => t.in_player.id === transfer.in_player_id,
  );
  const transferOutToModify = transfers.find(
    (t) => t.in_player.id === transfer.out_player_id,
  );

  if (transferInToModify && transferOutToModify) {
    const in_index = transferInToModify.immer_reverse[0].path[0];
    const out_index = transferOutToModify.immer_reverse[0].path[0];

    dispatch(
      modifyTransferPlain(
        produce(transferInToModify, (draft) => {
          draft.immer_reverse[0].path[0] = out_index;
        }),
      ),
    );

    dispatch(
      modifyTransferPlain(
        produce(transferOutToModify, (draft) => {
          draft.immer_reverse[0].path[0] = in_index;
        }),
      ),
    );

    return;
  }

  if (transferInToModify) {
    const new_in_index = transfer.immer_reverse.find(
      (r) => r.value.player_stats.id !== transferInToModify.in_player.id,
    )!.path[0];

    if (transferInToModify.immer_reverse[0].path[0] === new_in_index) {
      return;
    }

    return dispatch(
      modifyTransferPlain(
        produce(transferInToModify, (draft) => {
          draft.immer_reverse[0].path[0] = new_in_index;
        }),
      ),
    );
  }

  if (transferOutToModify) {
    const new_out_index = transfer.immer_reverse.find(
      (r) => r.value.player_stats.id !== transferOutToModify.in_player.id,
    )!.path[0];

    if (transferOutToModify.immer_reverse[0].path[0] === new_out_index) {
      return;
    }

    return dispatch(
      modifyTransferPlain(
        produce(transferOutToModify, (draft) => {
          draft.immer_reverse[0].path[0] = new_out_index;
        }),
      ),
    );
  }
};

export const addTransfer = (transfer: TransferLite): AsyncTransferAction => (
  dispatch,
  getRootState,
) => {
  const {
    profile: { user },
    transfers: { transfers },
  } = getRootState();

  let in_player = { id: transfer.in_player_id };
  let out_player = { id: transfer.out_player_id };
  let immer_reverse = transfer.immer_reverse;
  let cost: number;

  if (!user || !in_player || !out_player) return;

  const reverseTransfer = transfers.find(
    (t) =>
      t.in_player.id === transfer.out_player_id &&
      t.out_player.id === transfer.in_player_id,
  );
  if (reverseTransfer) {
    return removeTransfer(reverseTransfer)(dispatch, getRootState);
  }

  const complementaryTransfer = transfers.find(
    (t) => t.in_player.id === transfer.out_player_id,
  );
  if (complementaryTransfer) {
    out_player = { id: complementaryTransfer.out_player.id };
    immer_reverse = complementaryTransfer.immer_reverse;

    dispatch(modifyTransferPlain({ ...complementaryTransfer, in_player }));

    return;
  }

  const recomplementaryTransfer = transfers.find(
    (t) => t.out_player.id === transfer.in_player_id,
  );
  if (recomplementaryTransfer) {
    feedback.warning("Can't perform that transfer!");
    return dispatch(addChange(transfer.immer_reverse));
  }

  if (user.free_transfers) {
    cost = 0;
    dispatch<any>(setUser({ ...user, free_transfers: user.free_transfers - 1 }));
  } else {
    cost = DEFAULT_TRANSFER_COST;
  }
  dispatch(
    addTransferPlain({
      in_player,
      out_player,
      immer_reverse,
      cost,
    }),
  );
};
