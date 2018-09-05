export const RECEIVE_CUR_TRACK = 'RECEIVE_CUR_TRACK';
export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE';
export const SEEK = 'SEEK';
export const HTML_PLAYING = 'HTML_PLAYING';
export const RECEIVE_CURR_TIME = 'RECEIVE_CURR_TIME';
export const RECEIVE_QUEUE = 'RECEIVE_QUEUE';

export const receiveCurTrack = (trackId) => {
  return {
    type: RECEIVE_CUR_TRACK,
    trackId
  };
};

export const setCurrTime = (percentage) => {
  return {
    type: RECEIVE_CURR_TIME,
    percentage
  };
};

export const setQueue = (trackIds) => {
  return {
    type: RECEIVE_QUEUE,
    trackIds
  };
};

export const togglePlayPause = (bool) => {
  return {
    type: TOGGLE_PLAY_PAUSE,
    playing: bool
  };
};

export const seek = (progPercentage) => {
  return {
    type: SEEK,
    progPercentage
  };
};

export const setHTMLPlaying = (bool) => {
  return {
    type: HTML_PLAYING,
    bool
  };
};
