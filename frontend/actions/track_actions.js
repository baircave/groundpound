import * as TrackApiUtil from '../util/track_api_util';

export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const RECEIVE_TRACK_ERRORS = 'RECEIVE_TRACK_ERRORS';
export const DELETE_TRACK = 'DELETE_TRACK';
export const RECEIVE_PLAYCOUNT = 'RECEIVE_PLAYCOUNT';

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

export const removeTrack = (payload) => {
  return {
    type: DELETE_TRACK,
    trackId: String(payload.trackId),
    userId: String(payload.userId)
  };
};

export const receivePlaycount = (trackId) => {
  return {
    type: RECEIVE_PLAYCOUNT,
    trackId
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

export const deleteTrack = (trackId) => {
  return (dispatch) => {
    return TrackApiUtil.deleteTrack(trackId).then(
      (response) => dispatch(removeTrack(response))
    );
  };
};

export const incrementPlays = (trackId) => {
  return (dispatch) => {
    return TrackApiUtil.incrementPlays(trackId).then(
      () => dispatch(receivePlaycount(trackId))
    );
  };
};
