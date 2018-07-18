import { RECEIVE_CUR_TRACK, TOGGLE_PLAY_PAUSE } from '../actions/playbar_actions';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions';
import { merge } from 'lodash';

const defaultState = {
  visible: false,
  currentlyPlaying: null,
  playQueue: [],
  playing: false
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_TRACKS:
    case RECEIVE_TRACK:
      const newPlayQueue = newState.playQueue.concat(Object.keys(action.payload.tracks));
      newState.playQueue = newPlayQueue;
      return newState;
    case RECEIVE_CUR_TRACK:
      newState.curTrackId = action.trackId;
      newState.visible = true;
      return newState;
    case TOGGLE_PLAY_PAUSE:
      newState.playing = !newState.playing;
      return newState;
    default:
      return state;
  }
};
