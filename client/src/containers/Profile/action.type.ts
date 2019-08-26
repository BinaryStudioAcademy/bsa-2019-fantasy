import { User } from 'types/user.type';
import { Thunky } from 'store/types';

export const SET_USER = 'PROFILE_ACTION:SET_USER';
export const SET_IS_LOADING = 'PROFILE_ACTION:SET_IS_LOADING';
export const SET_EMAIL_PREF = 'PROFILE_ACTION:SET_EMAIL_PREF';
export const CHANGE_LANGUAGE = 'PROFILE_ACTION:CHANGE_LANGUAGE';

type SetUser = {
  type: typeof SET_USER;
  payload: User | null;
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};
type SetEmailPref = {
  type: typeof SET_EMAIL_PREF;
  payload: number | null;
};
type ChangeLanguage = {
  type: typeof CHANGE_LANGUAGE;
  payload: any;
};

export type UserAction = SetUser | SetLoading | ChangeLanguage | SetEmailPref;
export type AsyncUserAction = Thunky<UserAction>;
