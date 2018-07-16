import * as TrackApiUtil from '../util/track_api_util';

export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_TRACK_ERRORS = 'RECEIVE_TRACK_ERRORS';

const receiveTrack = (payload) => {
  return {
    type: RECEIVE_TRACK,
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

export const postTrack = (trackInfo) => {
  return (dispatch) => {
    return TrackApiUtil.postTrack(trackInfo).then(
      (payload) => dispatch(receiveTrack(payload)),
      (errors) => dispatch(receiveErrors(errors))
    );
  };
};
