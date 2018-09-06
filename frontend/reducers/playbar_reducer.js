import {
  RECEIVE_CUR_TRACK,
  TOGGLE_PLAY_PAUSE,
  SEEK,
  HTML_PLAYING,
  RECEIVE_CURR_TIME,
  RECEIVE_QUEUE
} from '../actions/playbar_actions';
import { RECEIVE_TRACK, RECEIVE_TRACKS, DELETE_TRACK } from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash';

const defaultState = {
  visible: false,
  currentlyPlayingId: null,
  currentlyPlayingIdx: null,
  playQueue: [],
  playing: false,
  audioHTMLPlaying: false,
  progPercentage: 0,
  currTime: 0
};

Array.prototype.softIncludes = function(el) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] == el) return true;
  }
  return false;
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  let newPlayQueue;
  switch (action.type) {
    case RECEIVE_USER:
    case RECEIVE_TRACKS:
      newState.playQueue = Object.keys(action.payload.tracks);
      return newState;
    case RECEIVE_TRACK:
      if (!newState.playQueue.softIncludes(action.payload.track.id)) {
        newState.playQueue.push(action.payload.track.id);
      }
      return newState;
    case RECEIVE_CUR_TRACK:
      newState.currentlyPlayingId = action.trackId;
      const newCurrentlyPlayingIdx = newState.playQueue.findIndex((el) => action.trackId == el);
      if (newCurrentlyPlayingIdx === -1) {
        newState.playQueue.push(action.trackId);
        newState.currentlyPlayingIdx = newState.playQueue.length - 1;
      } else {
        newState.currentlyPlayingIdx = newCurrentlyPlayingIdx;
      }
      newState.progPercentage = 0;
      newState.currTime = 0;
      newState.visible = true;
      return newState;
    case RECEIVE_QUEUE:
      newState.playQueue = action.trackIds;
      return newState;
    case TOGGLE_PLAY_PAUSE:
      newState.playing = action.playing;
      return newState;
    case SEEK:
      newState.progPercentage = action.progPercentage;
      return newState;
    case RECEIVE_CURR_TIME:
      newState.currTime = action.percentage;
      return newState;
    case HTML_PLAYING:
      newState.audioHTMLPlaying = action.bool;
      return newState;
    case DELETE_TRACK:
      newState.playQueue = newState.playQueue.filter((trackId) => trackId !== action.trackId);
      if (newState.currentlyPlayingId === action.trackId) {
        newState.currentlyPlayingId = null;
        newState.currentlyPlayingIdx = null;
        newState.playing = false;
      }
      return newState;
    default:
      return state;
  }
};
