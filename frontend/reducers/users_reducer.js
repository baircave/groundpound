import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  let users;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const newState = merge({}, state);
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_TRACK:
      users = action.payload.users;
      return merge({}, state, users);
    default:
      return state;
  }
};
