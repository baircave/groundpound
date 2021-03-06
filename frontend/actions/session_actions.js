import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const receiveCurrentUser = (payload) => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload
  };
};

const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const receiveErrors = (errorsArray) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errorsArray
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const login = (user) => {
  return (dispatch) => {
    return SessionApiUtil.login(user).then(
      (payload) => dispatch(receiveCurrentUser(payload)),
      (errors) => dispatch(receiveErrors(errors))
    );
  };
};

export const signup = (user) => {
  return (dispatch) => {
    return SessionApiUtil.signup(user).then(
      (payload) => dispatch(receiveCurrentUser(payload)),
      (errors) => dispatch(receiveErrors(errors))
    );
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionApiUtil.logout().then(
      (user) => dispatch(logoutCurrentUser())
    );
  };
};
