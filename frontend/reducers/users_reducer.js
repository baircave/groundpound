import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRACK, RECEIVE_TRACKS, DELETE_TRACK } from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash';
import { RECEIVE_LIKE } from '../actions/like_actions';
import { RECEIVE_REPOST } from '../actions/repost_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let users;
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_TRACKS:
    case RECEIVE_TRACK:
    case RECEIVE_USER:
    case RECEIVE_CURRENT_USER:
      return merge(newState, action.payload.users);
      // if (newState[action.user.id]) return newState;
      // newState[action.user.id] = action.user;
      // return newState;
    case DELETE_TRACK:
      const user = newState[action.userId];
      if (user.track_ids) {
        user.track_ids = user.track_ids.filter((trackId) => trackId != action.trackId);
      }
      return newState;
    case RECEIVE_LIKE:
      newState[action.user_id].liked_ids = action.liked_ids;
      return newState;
    case RECEIVE_REPOST:
      newState[action.user_id].reposted_ids = action.reposted_ids;
      return newState;
    default:
      return state;
  }
};
