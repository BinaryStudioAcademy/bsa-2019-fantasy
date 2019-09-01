import Cookies from 'js-cookie';
import { feedback } from 'react-feedbacker';

import { User } from 'types/user.type';
import { Club } from 'types/club.types';
import * as authService from 'services/authService';
import * as profileService from 'services/profileService';
import * as forgotPasswordService from 'services/forgotPasswordService';
import { LoginCredentials, RegisterCredentials } from 'types/auth.types';
import {
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from 'types/forgot.password.types';

import { UserTeamDetails } from 'types/user.type';
import { TeamMemberData } from 'types/teamMemberHistory.types';
import { GameweekType } from 'types/gameweek.type';

import {
  SET_USER,
  SET_IS_LOADING,
  SET_EMAIL_PREF,
  CHANGE_LANGUAGE,
  AsyncUserAction,
  UserAction,
  SET_INVITE_CODE,
} from './action.type';
import { FixturesItemType } from 'types/fixtures.types';

const setToken = (token: string) => localStorage.setItem('token', token);
const clearToken = () => localStorage.removeItem('token');

export const setInviteCode = (code: string): UserAction => ({
  type: SET_INVITE_CODE,
  payload: code,
});

export const setUser = (user: User | null): UserAction => ({
  type: SET_USER,
  payload: user,
});

const setIsLoading = (isLoading: boolean): UserAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});
const setEmailPref = (sendmailTime: number | null): UserAction => ({
  type: SET_EMAIL_PREF,
  payload: sendmailTime,
});
export const setLanguage = (request: { language: string }): UserAction => ({
  type: CHANGE_LANGUAGE,
  payload: request,
});

const setAuthData = (user: User, token: string): AsyncUserAction => (dispatch) => {
  setToken(token);
  dispatch(setUser(user));
};

const handleAuthResponse = (
  authResponsePromise: Promise<{
    user: User;
    token: string;
  }>,
): AsyncUserAction => async (dispatch, getRootState) => {
  try {
    const { user, token } = await authResponsePromise;
    setAuthData(user, token)(dispatch, getRootState);
  } catch (err) {
    feedback.error(err && err.message ? err.message : err);
  }
};

export const login = (request: LoginCredentials) =>
  handleAuthResponse(authService.login(request));

export const registration = (request: RegisterCredentials) =>
  handleAuthResponse(authService.registration(request));

export const forgotPassword = (request: ForgotPasswordCredentials) => async () => {
  const result = await forgotPasswordService.forgotPassword(request);
  return result;
};

export const resetPassword = (request: ResetPasswordCredentials) => async () => {
  const result = await forgotPasswordService.resetPassword(request);
  return result;
};

export const logout = (): AsyncUserAction => (dispatch) => {
  clearToken();
  dispatch(setUser(null));
};

const retrieveTokenFromCookie = () => {
  const token = Cookies.get('token');

  if (token) {
    localStorage.setItem('token', token);
    Cookies.remove('token');
  }
};

export const loadCurrentUser = (soft = false): AsyncUserAction => async (dispatch) => {
  if (!soft) {
    dispatch(setIsLoading(true));
  }

  retrieveTokenFromCookie();

  try {
    const user = await authService.getCurrentUser();
    dispatch(setUser(user));
  } catch (err) {
    dispatch(setUser(null));
  } finally {
    if (!soft) {
      dispatch(setIsLoading(false));
    }

    if (window.location.hash === '#_=_') {
      window.location.hash = '';
    }
  }
};

export const updateFavoriteClub = (id: Club['id']): AsyncUserAction => async (
  dispatch,
  getState,
) => {
  try {
    const res = await profileService.updateClub(id);
    loadCurrentUser(true)(dispatch, getState);
    feedback.success((res && res.message) || res);
  } catch (err) {
    feedback.error('Failed to update favorite club.');
  }
};

export const updateEmailPreferences = (
  sendmailTime: User['sendmail_time'],
): AsyncUserAction => async (dispatch, getState) => {
  try {
    const user = await authService.getCurrentUser();
    const res = await profileService.updateEmailPref(user!.id, sendmailTime);
    loadCurrentUser(true)(dispatch, getState);

    dispatch(setEmailPref(sendmailTime));
    feedback.success((res && res.message) || res);
  } catch (err) {
    feedback.error('Failed to update favorite club.');
  }
};

export const createFixtureSubscription = (
  gameId: FixturesItemType['id'],
): AsyncUserAction => async (dispatch, getState) => {
  try {
    const user = await authService.getCurrentUser();
    const res = await profileService.createFixtureSub(user!.id, gameId);
    loadCurrentUser(true)(dispatch, getState);
  } catch (err) {
    feedback.error('Failed to update favorite club.');
  }
};

export const deleteFixtureSubscription = (
  gameId: FixturesItemType['id'],
): AsyncUserAction => async (dispatch, getState) => {
  try {
    const user = await authService.getCurrentUser();
    const res = await profileService.destroyFixtureSub(user!.id, gameId);
    loadCurrentUser(true)(dispatch, getState);
  } catch (err) {
    feedback.error('Failed to update favorite club.');
  }
};

export const updateUserTeamDetails = (
  userData: UserTeamDetails,
  teamMemberData: TeamMemberData,
  gameweekId: GameweekType['id'],
): AsyncUserAction => async (dispatch, getState) => {
  try {
    const { user } = getState().profile;

    const res = await profileService.updateUserTeamDetails(
      user!.id,
      gameweekId,
      userData,
      teamMemberData,
    );
    loadCurrentUser(true)(dispatch, getState);
    feedback.success((res && res.message) || res);
  } catch (err) {
    feedback.error('Failed to create your team');
  }
};

export const updateUserAvatar = (imageId: string): AsyncUserAction => async (
  dispatch,
  getState,
) => {
  try {
    const user = await authService.getCurrentUser();
    const res = await profileService.updateUserAvatar(user!.id, imageId);
    loadCurrentUser(true)(dispatch, getState);
    feedback.success((res && res.message) || res);
  } catch {
    feedback.error('Failed to change your avatar');
  }
};
