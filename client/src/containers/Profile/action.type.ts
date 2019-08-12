import { User } from 'types/user.type';
import { Thunky } from 'store/types';

export const SET_USER = 'PROFILE_ACTION:SET_USER';
export const SET_IS_LOADING = 'PROFILE_ACTION:SET_IS_LOADING';

type SetUser = {
  type: typeof SET_USER;
  payload: User | null;
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type UserAction = SetUser | SetLoading;
export type AsyncUserAction = Thunky<UserAction>;
