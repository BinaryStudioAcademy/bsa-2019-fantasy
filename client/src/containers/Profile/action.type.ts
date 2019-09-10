import { User } from 'types/user.type';
import { Thunky } from 'store/types';

export const SET_USER = 'PROFILE_ACTION:SET_USER';
export const SET_IS_LOADING = 'PROFILE_ACTION:SET_IS_LOADING';
export const SET_EMAIL_PREF = 'PROFILE_ACTION:SET_EMAIL_PREF';
export const CHANGE_LANGUAGE = 'PROFILE_ACTION:CHANGE_LANGUAGE';
export const SET_INVITE_CODE = 'SET_INVITE_CODE';
export const SET_CURRENT_SUBSCRIBE_LOADING = 'SET_CURRENT_SUBSCRIBE_LOADING';

type SetUser = {
  type: typeof SET_USER;
  payload: User | null;
};

type SetInviteCode = {
  type: typeof SET_INVITE_CODE;
  payload: string;
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

type SetCurrentSubscribeLoading = {
  type: typeof SET_CURRENT_SUBSCRIBE_LOADING;
  payload: string;
};

export type UserAction =
  | SetUser
  | SetLoading
  | ChangeLanguage
  | SetEmailPref
  | SetCurrentSubscribeLoading
  | SetInviteCode;
export type AsyncUserAction = Thunky<UserAction>;
