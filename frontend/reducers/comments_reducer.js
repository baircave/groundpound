import { RECEIVE_TRACK } from '../actions/track_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  let comments;
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_TRACK:
      comments = action.payload.comments;
      return merge(newState, comments);
    case RECEIVE_COMMENT:
      return merge(newState, action.comment);
    default:
      return state;
  }
};
