import { RECEIVE_CUR_TRACK, TOGGLE_PLAY_PAUSE } from '../actions/playbar_actions';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions';
import { merge } from 'lodash';

const defaultState = {
  visible: false,
  currentlyPlayingId: null,
  currentlyPlayingIdx: null,
  playQueue: [],
  playing: false
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  let newPlayQueue;
  switch (action.type) {
    case RECEIVE_TRACKS:
      newPlayQueue = newState.playQueue.concat(Object.keys(action.payload.tracks));
      newState.playQueue = newPlayQueue;
      return newState;
    case RECEIVE_TRACK:
      if (newState.playQueue[newState.playQueue.length - 1] != action.payload.track.id) {
        newState.playQueue.push(action.payload.track.id);
      }
      return newState;
    case RECEIVE_CUR_TRACK:
      newState.currentlyPlayingId = action.trackId;
      const newCurrentlyPlayingIdx = newState.playQueue.findIndex((el) => action.trackId === el);
      if (newCurrentlyPlayingIdx === -1) {
        newState.playQueue.push(action.trackId);
        newState.currentlyPlayingIdx = newState.playQueue.length - 1;
      } else {
        newState.currentlyPlayingIdx = newCurrentlyPlayingIdx;
      }
      newState.visible = true;
      return newState;
    case TOGGLE_PLAY_PAUSE:
      newState.playing = action.playing;
      return newState;
    default:
      return state;
  }
};
