import { TransferType } from 'types/transfer.type';
import { Thunky } from 'store/types';
import { Patch } from 'immer';

export const ADD_TRANSFER = 'TRANSFER_ACTION:ADD_TRANSFER';
export const MODIFY_TRANSFER = 'TRANSFER_ACTION:MODIFY_TRANSFER';
export const REMOVE_TRANSFER = 'TRANSFER_ACTION:REMOVE_TRANSFER';
export const EMPTY_TRANSFERS = 'TRANSFER_ACTION:EMPTY_TRANSFERS';
export const ADD_CHANGE = 'TRANSFER_ACTION:ADD_CHANGE';
export const REMOVE_CHANGE = 'TRANSFER_ACTION:REMOVE_CHANGE';
export const EMPTY_CHANGES = 'TRANSFER_ACTION:EMPTY_CHANGE';

type AddTransfer = {
  type: typeof ADD_TRANSFER;
  payload: TransferType;
};

type ModifyTransfer = {
  type: typeof MODIFY_TRANSFER;
  payload: TransferType;
};

type RemoveTransfer = {
  type: typeof REMOVE_TRANSFER;
  payload: TransferType['id'];
};

type EmptyTransfers = {
  type: typeof EMPTY_TRANSFERS;
};

type AddChange = {
  type: typeof ADD_CHANGE;
  payload: Patch[];
};

type RemoveChange = {
  type: typeof REMOVE_CHANGE;
  payload: Patch[];
};

type EmptyChanges = {
  type: typeof EMPTY_CHANGES;
};

export type TransferAction =
  | AddTransfer
  | ModifyTransfer
  | RemoveTransfer
  | EmptyTransfers
  | AddChange
  | RemoveChange
  | EmptyChanges;
export type AsyncTransferAction = Thunky<TransferAction>;
