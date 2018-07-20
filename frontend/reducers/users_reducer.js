import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  let users;
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, action.payload.users);
    case RECEIVE_CURRENT_USER:
      const newState = merge({}, state);
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_TRACKS:
    case RECEIVE_TRACK:
      users = action.payload.users;
      return merge({}, state, users);
    default:
      return state;
  }
};
