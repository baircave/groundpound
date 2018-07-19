import { RECEIVE_TRACK } from '../actions/track_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';
import { merge } from 'lodash';


export default (state = {}, action) => {
  Object.freeze(state);
  let tracks;
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_TRACK:
      tracks = action.payload.tracks;
      return merge(newState, tracks);
    case RECEIVE_COMMENT:
      newState[action.trackId].comment_ids.unshift(Object.keys(action.comment)[0]);
      return newState;
    default:
      return state;
  }
};
