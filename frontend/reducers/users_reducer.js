import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_TRACK, RECEIVE_TRACKS, DELETE_TRACK } from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { merge, assign } from 'lodash';
import { RECEIVE_LIKE } from '../actions/like_actions';
import { RECEIVE_REPOST } from '../actions/repost_actions';
import { RECEIVE_FOLLOWS } from '../actions/follow_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let users;
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_TRACKS:
    case RECEIVE_TRACK:
    case RECEIVE_CURRENT_USER:
      return merge(newState, action.payload.users);
    case RECEIVE_USER:
    case RECEIVE_LIKE:
    case RECEIVE_REPOST:
      return assign(newState, action.payload.users);
    case RECEIVE_FOLLOWS:
      const currUser = newState[action.userId];
      currUser.followed_ids = action.followedIds;
      return newState;
    case DELETE_TRACK:
      const user = newState[action.userId];
      if (user.track_ids) {
        user.track_ids = user.track_ids.filter((trackId) => trackId != action.trackId);
      }
      return newState;
    case RECEIVE_REPOST:
      newState[action.userId].reposted_ids = action.repostedIds;
      return newState;
    default:
      return state;
  }
};
