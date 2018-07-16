import { RECEIVE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  let tracks;
  switch (action.type) {
    case RECEIVE_TRACK:
      tracks = action.payload.tracks;
      return merge({}, state, tracks);
    default:
      return state;
  }
};
