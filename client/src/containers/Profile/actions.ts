import { feedback } from 'react-feedbacker';

import * as authService from 'services/authService';
import * as forgotPasswordService from 'services/forgotPasswordService';
import { User } from 'types/user.type';
import { LoginCredentials, RegisterCredentials } from 'types/auth.types';
import {
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from 'types/forgot.password.types';

import { SET_USER, SET_IS_LOADING, AsyncUserAction, UserAction } from './action.type';

const setToken = (token: string) => localStorage.setItem('token', token);
const clearToken = () => localStorage.removeItem('token');

const setUser = (user: User | null): UserAction => ({
  type: SET_USER,
  payload: user,
});

const setIsLoading = (isLoading: boolean): UserAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
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

export const loadCurrentUser = (): AsyncUserAction => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const user = await authService.getCurrentUser();
    dispatch(setUser(user));
  } catch (err) {
    dispatch(setUser(null));
  } finally {
    dispatch(setIsLoading(false));
  }
};
