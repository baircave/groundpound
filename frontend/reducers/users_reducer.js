import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRACK, RECEIVE_TRACKS, DELETE_TRACK } from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  let users;
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, action.payload.users);
    case RECEIVE_CURRENT_USER:
      if (newState[action.user.id]) return newState;
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_TRACKS:
    case RECEIVE_TRACK:
      users = action.payload.users;
      return merge({}, state, users);
    case DELETE_TRACK:
      const user = newState[action.userId];
      if (user.track_ids) {
        user.track_ids = user.track_ids.filter((trackId) => trackId != action.trackId);
      }
      return newState;
    default:
      return state;
  }
};
