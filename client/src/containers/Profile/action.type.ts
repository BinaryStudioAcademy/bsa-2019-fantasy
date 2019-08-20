import { User } from 'types/user.type';
import { Thunky } from 'store/types';

export const SET_USER = 'PROFILE_ACTION:SET_USER';
export const SET_IS_LOADING = 'PROFILE_ACTION:SET_IS_LOADING';
export const CHANGE_LANGUAGE = 'PROFILE_ACTION:CHANGE_LANGUAGE';

type SetUser = {
  type: typeof SET_USER;
  payload: User | null;
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

type ChangeLanguage = {
  type: typeof CHANGE_LANGUAGE;
  payload: any;
};

export type UserAction = SetUser | SetLoading | ChangeLanguage;
export type AsyncUserAction = Thunky<UserAction>;
