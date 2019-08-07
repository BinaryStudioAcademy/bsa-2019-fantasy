import * as authService from 'services/authService';
import { User } from 'types/user.type';
import { LoginCredentials, RegisterCredentials } from 'types/auth.types';

import { SET_USER, SET_IS_LOADING, AsyncUserAction, UserAction } from './action.type';

const setToken = (token: string) => localStorage.setItem('token', token);

const setUser = (user: User | null): UserAction => ({
    type: SET_USER,
    payload: user,
});

const setIsLoading = (isLoading: boolean): UserAction => ({
    type: SET_IS_LOADING,
    payload: isLoading,
});

const setAuthData = (user: User | null = null, token = ''): AsyncUserAction => (
    dispatch
) => {
    setToken(token); // token should be set first before user
    dispatch(setUser(user));
};

const handleAuthResponse = (
    authResponsePromise: Promise<{
        user: User;
        token: string;
    }>
): AsyncUserAction => async (dispatch, getRootState) => {
    const { user, token } = await authResponsePromise;
    setAuthData(user, token)(dispatch, getRootState);
};

export const login = (request: LoginCredentials) =>
    handleAuthResponse(authService.login(request));

export const registration = (request: RegisterCredentials) =>
    handleAuthResponse(authService.registration(request));

export const logout = () => setAuthData();

export const loadCurrentUser = (): AsyncUserAction => async (dispatch) => {
    dispatch(setIsLoading(true));

    // bring it back later as authorization will be implemented
    // const user = await authService.getCurrentUser();
    const user: User = { id: 'dummy_thingy', username: 'Dummy', email: 'dummy@dummy' };

    setTimeout(() => {
        dispatch(setUser(user));
        dispatch(setIsLoading(false));
    }, 1000);
};
