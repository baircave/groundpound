import * as SessionApiUtil from '../util/session_api_util';


export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

export const receiveCurrentUser = (user) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const login = (user) => {
  return (dispatch) => {
    return SessionApiUtil.login(user).then(
      (user) => dispatch(receiveCurrentUser(user))
    );
  };
};

export const signup = (user) => {
  return (dispatch) => {

  };
};
