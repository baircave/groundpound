import { RECEIVE_TRACK, RECEIVE_TRACKS, DELETE_TRACK, RECEIVE_PLAYCOUNT } from '../actions/track_actions';
import { RECEIVE_COMMENT, DELETE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_LIKE } from '../actions/like_actions';
import { RECEIVE_REPOST } from '../actions/repost_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_LIKE:
    case RECEIVE_REPOST:
    case RECEIVE_USER:
    case RECEIVE_CURRENT_USER:
    case RECEIVE_TRACKS:
      const tracks = action.payload.tracks;
      return merge(newState, tracks);
    case RECEIVE_TRACK:
      let track = action.payload.track;
      return merge(newState, { [track.id]: track });
    case RECEIVE_PLAYCOUNT:
      track = newState[action.trackId];
      track.plays += 1;
      return newState;
    case RECEIVE_COMMENT:
      newState[action.trackId].comment_ids.unshift(Object.keys(action.comment)[0]);
      return newState;
    case DELETE_TRACK:
      delete newState[action.trackId];
      return newState;
    case DELETE_COMMENT:
      newState[action.trackId].comment_ids = newState[action.trackId].comment_ids.filter(
        (commentId) => String(commentId) !== String(action.commentId)
      );
      return newState;
    default:
      return state;
  }
};
