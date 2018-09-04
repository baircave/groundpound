import * as RepostApiUtil from '../util/repost_api_util';

export const RECEIVE_REPOST = "RECEIVE_REPOST";

export const receiveRepost = (payload) => {
  return {
    type: RECEIVE_REPOST,
    payload
  };
};

export const makeRepost = (trackId) => {
  return (dispatch) => {
    return RepostApiUtil.makeRepost(trackId).then(
      (payload) => dispatch(receiveRepost(payload))
    );
  };
};

export const deleteRepost = (trackId) => {
  return (dispatch) => {
    return RepostApiUtil.deleteRepost(trackId).then(
      (payload) => dispatch(receiveRepost(payload))
    );
  };
};
