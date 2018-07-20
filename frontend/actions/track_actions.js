import * as TrackApiUtil from '../util/track_api_util';

export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const RECEIVE_TRACK_ERRORS = 'RECEIVE_TRACK_ERRORS';

const receiveTrack = (payload) => {
  return {
    type: RECEIVE_TRACK,
    payload
  };
};

const receiveTracks = (payload) => {
  return {
    type: RECEIVE_TRACKS,
    payload
  };
};

export const receiveErrors = (errorsArray) => {
  return {
    type: RECEIVE_TRACK_ERRORS,
    errors: errorsArray
  };
};

export const fetchTrack = (trackId) => {
  return (dispatch) => {
    return TrackApiUtil.fetchTrack(trackId).then(
      (payload) => dispatch(receiveTrack(payload)),
      (errors) => dispatch(receiveErrors(errors))
    );
  };
};

export const fetchTracks = () => {
  return (dispatch) => {
    return TrackApiUtil.fetchTracks().then(
      (payload) => dispatch(receiveTracks(payload)),
      (errors) => dispatch(receiveErrors(errors))
    );
  };
};

export const postTrack = (trackInfo) => {
  return (dispatch) => {
    return TrackApiUtil.postTrack(trackInfo).then(
      (payload) => dispatch(receiveTrack(payload)),
      (errors) => dispatch(receiveErrors(errors))
    );
  };
};
