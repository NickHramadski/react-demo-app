import { authApi } from '../../axios.instance'

export const LOGIN = 'AUTH_LOGIN';
export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const LOGIN_FAILED = 'AUTH_LOGIN_FAILED';
export const LOGOUT = 'AUTH_LOGOUT';

export const loginSuccess = (email) => {
    return {
        type: LOGIN_SUCCESS,
        payload: email
    };
};

export const loginFailed = (error) => {
    return {
        type: LOGIN_FAILED,
        payload: error
    };
};

export const login = (login, password) => {
    return dispatch => {
        authApi.post(`/login`, { login, password })
            .then(() => {
                dispatch(loginSuccess(login));
            })
            .catch(error => {
                dispatch(loginFailed(error))
            })
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};